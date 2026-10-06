# Academia Gol — Etapa 1

Prototipo visual del inicio del administrador. Nombre y logo provisionales; datos ficticios. Creado con Vite, HTML, CSS y JavaScript, sin servicios externos, cuentas ni base de datos.

## Abrir en Visual Studio Code (Windows)

1. Instalá Node.js con npm si aún no lo tenés. Este proyecto requiere Node.js 22.12 o superior (recomendado: 24).
2. Extraé este ZIP. En VS Code elegí **Archivo → Abrir carpeta** y seleccioná `academia-gol`, donde está `package.json`.
3. Abrí **Terminal → Nueva terminal**. Si PowerShell bloquea npm, seleccioná **Command Prompt / Símbolo del sistema** en el selector de terminal.
4. Ejecutá `npm install` una sola vez. Necesita conexión a Internet.
5. Ejecutá `npm run dev`.
6. Abrí la dirección que muestre la terminal, normalmente http://127.0.0.1:5173.

Para detenerlo: Ctrl+C en la terminal. Para volver a abrirlo: `npm run dev`. No abrir index.html con doble clic ni usar Live Server.

## Qué revisar con el cliente

- Blanco y verde, logo provisional, legibilidad y distribución.
- Indicadores de ejemplo: alumnos, categorías, asistencia e informes.
- Agenda: cambiar entre lunes, martes y sábado.
- Comunicados: abrir tarjetas y botón de notificaciones.
- Equipos: tarjetas con asistencia de ejemplo.
- Botón Nuevo alumno: muestra la apariencia de una ficha, sin registrar datos.
- Menú lateral: las secciones pendientes muestran el contenido previsto.
- Celular: menú plegable, tarjetas y secciones adaptadas al ancho.

Los números son ilustrativos. Los 3 equipos visibles son una selección de 6 categorías ficticias. Las fechas de la agenda son fijas (28 de septiembre al 4 de octubre de 2026). No representan información actual ni se actualizan solas. No se guardan ni envían datos. No hay autenticación ni selector de roles en esta etapa.

## Organización

- `index.html`: documento base.
- `src/main.js`: pantalla, datos de ejemplo e interacciones.
- `src/style.css`: colores, diseño y adaptación móvil.
- `public/favicon.svg`: escudo provisional.
- `package.json`: configuración y comandos.

Para cambiar el verde principal, buscá `--green` y `#166534` en el CSS. El verde brillante es `#22c55e`. Nombre y textos están en `src/main.js` e `index.html`.

## Próximas etapas

1. Revisar y ajustar este inicio del administrador.
2. Construir las pantallas restantes del administrador.
3. Diseñar las vistas de padres y profesionales, con selector de perfil de demostración.
4. Revisar con el cliente y definir alcance funcional.

## Compilación

`npm run build` genera `dist/`. `npm run preview` permite revisar esa compilación en el navegador. No publicar datos personales reales en esta demostración.
