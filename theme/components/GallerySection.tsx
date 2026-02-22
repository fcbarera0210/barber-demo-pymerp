import { motion } from 'framer-motion';

interface GallerySectionProps {
  images: string[];
}

export function GallerySection({ images }: GallerySectionProps) {
  return (
    <section id="galeria" className="barberias-aureo-gallery py-16 sm:py-24 bg-[#0f0f0f]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-2">Galería</h2>
          <div className="section-bar mx-auto" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="aspect-square overflow-hidden rounded-sm group"
            >
              <img
                src={src}
                alt={`Galería ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="600"%3E%3Crect fill="%23222" width="600" height="600"/%3E%3C/svg%3E';
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
