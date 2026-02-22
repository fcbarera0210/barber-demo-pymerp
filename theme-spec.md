# Theme Spec – barberias-aureo (Premium Demo Theme)

## 0. Objetivo

Convertir el diseño actual en un **theme premium completo para barberías**, preparado para integrarse en un sistema SaaS existente.

Este theme debe ser:

* Mobile-first
* Responsive completo
* Visualmente premium
* Modular
* Compatible con estructura de datos externa
* Sin lógica de backend real (usar mocks por ahora)

Este theme será un **renderer visual**, no debe contener lógica de negocio compleja.

---

# 1. Nombre del Theme

Nombre oficial:

`barberias-aureo`

Usar este nombre en:

* clases CSS raíz
* contenedor principal
* atributos data-theme si aplica

Ejemplo:

```html
<div class="barberias-aureo">
```

---

# 2. Estructura general obligatoria

El theme debe tener estas secciones en este orden:

```
Hero
Trust / Social Proof
Servicios
Beneficios
Galería
Equipo
Testimonios
Horarios
Ubicación
CTA final
Footer
```

Todas las secciones deben existir aunque usen datos mock.

---

# 3. Estructura técnica del layout

El layout debe estar preparado para recibir este objeto:

```js
{
  company,
  appearance,
  services,
  professionals,
  schedules,
  serviceSchedules
}
```

No consumir APIs directamente.

Solo renderizar UI basada en props.

Por ahora usar mocks.

---

# 4. Sección Hero (Premium complejo)

Debe incluir:

* logo
* hero title
* hero description
* imagen o background
* botón principal "Reservar ahora"
* botón secundario "Ver servicios"

Opcional premium:

* tarjetas flotantes
* badge de rating
* overlay gradiente

Debe ocupar 100vh en desktop.

Mobile adaptado sin romper jerarquía visual.

---

# 5. Sección Trust / Social Proof

Pequeña sección debajo del hero.

Contenido ejemplo:

* estrellas rating
* número de clientes
* años de experiencia

Ejemplo visual:

★★★★★ 4.9 / 5
+500 clientes satisfechos

---

# 6. Sección Servicios

Renderizar lista de servicios.

Cada servicio debe tener:

* nombre
* precio
* duración
* botón reservar

Formato recomendado:

grid responsive:

mobile: 1 columna
tablet: 2 columnas
desktop: 3 columnas

Cada card debe verse premium.

---

# 7. Sección Beneficios

Sección visual explicando ventajas.

Ejemplo:

* barberos expertos
* productos premium
* ambiente profesional

Formato:

icono + título + descripción

---

# 8. Sección Galería

Grid de imágenes.

Mobile: 2 columnas
Desktop: 4 columnas

Imágenes mock por ahora.

---

# 9. Sección Equipo

Lista de profesionales.

Cada profesional debe mostrar:

* foto
* nombre
* especialidades

Formato:

cards o carrusel.

---

# 10. Sección Testimonios

Mostrar clientes felices.

Cada testimonial:

* nombre
* texto
* rating

Mock por ahora.

---

# 11. Sección Horarios

Mostrar horarios de atención.

Formato simple:

Lunes a Viernes
09:00 - 20:00

---

# 12. Sección Ubicación

Mostrar:

* dirección
* mapa mock o imagen

---

# 13. CTA Final

Sección fuerte antes del footer.

Contenido:

Título motivador

Botón:

Reservar ahora

---

# 14. Footer

Debe contener:

* logo
* nombre empresa
* redes sociales
* copyright

---

# 15. Responsive obligatorio

Mobile first obligatorio.

Breakpoints recomendados:

```
mobile: default
tablet: 768px
desktop: 1024px
large: 1280px
```

Nada debe romperse en mobile.

---

# 16. Estándares visuales

Debe sentirse:

premium
elegante
moderno

Usar:

* buen espaciado
* tipografía clara
* jerarquía visual fuerte

Evitar diseño genérico.

---

# 17. Estándares técnicos

El layout debe:

NO usar lógica de backend

NO usar fetch

NO usar firebase

NO usar APIs

Solo props o mocks.

---

# 18. Preparación para integración futura

Cada sección debe ser modular.

Ejemplo:

HeroSection
ServicesSection
TeamSection

No escribir todo en un solo archivo gigante.

---

# 19. Interacciones mock permitidas

Se permite:

abrir modales fake

hover effects

animaciones

scroll animations

---

# 20. Contenedor raíz obligatorio

Todo debe estar envuelto en:

```html
<div class="barberias-aureo">
```

Esto permitirá aislar estilos.

---

# 21. Objetivo final del resultado

El resultado debe parecer un theme premium profesional listo para vender.

Debe parecer parte de un SaaS moderno.

No un template básico.

---

# 22. Resultado esperado

Una página completa funcional visualmente con:

* todas las secciones
* responsive completo
* estilo premium consistente
* datos mock

Lista para futura integración.

---

# Fin del documento
