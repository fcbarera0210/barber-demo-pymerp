import { useState, useRef, useCallback, useEffect } from 'react';
import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { Icon } from '@iconify/react';

const POSITION_STORAGE_KEY = 'barber-accent-menu-position';
const DEFAULT_POSITION = { x: 24, y: 24 };
function getInitialPosition(): { x: number; y: number } {
  if (typeof window === 'undefined') return DEFAULT_POSITION;
  try {
    const stored = localStorage.getItem(POSITION_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as { x: number; y: number };
      if (typeof parsed.x === 'number' && typeof parsed.y === 'number') return parsed;
    }
  } catch {
    // ignore
  }
  return DEFAULT_POSITION;
}

function clampPosition(x: number, y: number): { x: number; y: number } {
  const padding = 8;
  const btnSize = 56;
  const maxX = typeof window !== 'undefined' ? window.innerWidth - btnSize - padding : 400;
  const maxY = typeof window !== 'undefined' ? window.innerHeight - btnSize - padding : 400;
  return {
    x: Math.max(padding, Math.min(maxX, x)),
    y: Math.max(padding, Math.min(maxY, y)),
  };
}

interface AccentColorMenuProps {
  accentColor: string;
  onAccentChange: (color: string) => void;
}

export function AccentColorMenu({ accentColor, onAccentChange }: AccentColorMenuProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(getInitialPosition);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number; elX: number; elY: number } | null>(null);
  const hasDragged = useRef(false);
  const lastPositionRef = useRef(position);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  lastPositionRef.current = position;

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!dragStart.current) return;
      hasDragged.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - dragStart.current.x;
      const dy = clientY - dragStart.current.y;
      const next = clampPosition(dragStart.current.elX + dx, dragStart.current.elY + dy);
      lastPositionRef.current = next;
      setPosition(next);
    };
    const handleEnd = () => {
      setDragging(false);
      dragStart.current = null;
      if (typeof window !== 'undefined') {
        const pos = lastPositionRef.current;
        localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify({ x: pos.x, y: pos.y }));
      }
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [dragging, position]);

  const handlePointerDown = useCallback(
    (e: ReactMouseEvent | ReactTouchEvent) => {
      if ((e.target as HTMLElement).closest('[data-accent-panel]')) return;
      hasDragged.current = false;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setDragging(true);
      dragStart.current = { x: clientX, y: clientY, elX: position.x, elY: position.y };
    },
    [position]
  );

  const handleClick = useCallback((e: ReactMouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-accent-panel]')) return;
    if (hasDragged.current) return;
    setOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const el = e.target as Node;
      if (panelRef.current?.contains(el) || btnRef.current?.contains(el)) return;
      setOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  return (
    <>
      <div
        className="fixed z-[9999] flex items-center justify-end"
        style={{ left: position.x, top: position.y }}
      >
        <div className="relative flex flex-col items-end gap-2">
          {open && (
            <div
              ref={panelRef}
              data-accent-panel
              className="flex flex-col items-center gap-3 rounded-lg border border-white/10 bg-zinc-900/95 p-4 shadow-xl backdrop-blur-sm"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-white/90">
                Color de acento
              </span>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => onAccentChange(e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border-0 bg-transparent p-0"
                  aria-label="Elegir color de acento"
                />
                <span
                  className="text-xs text-white/70"
                  style={{ fontFamily: 'monospace' }}
                >
                  {accentColor}
                </span>
              </div>
            </div>
          )}
          <button
            ref={btnRef}
            type="button"
            onClick={handleClick}
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
            className="flex h-14 w-14 cursor-grab items-center justify-center rounded-full border border-white/10 bg-zinc-900/95 shadow-lg backdrop-blur-sm transition hover:border-white/20 active:cursor-grabbing"
            style={{ backgroundColor: accentColor }}
            aria-label={open ? 'Cerrar menú de color' : 'Abrir menú de color'}
            aria-expanded={open}
          >
            <Icon
              icon="mdi:palette-outline"
              className="h-7 w-7 text-white drop-shadow-md"
              aria-hidden
            />
          </button>
        </div>
      </div>
    </>
  );
}
