# Academia Gol ⚽

Prototipo de una plataforma web para gestionar una academia deportiva y conectar a administradores, profesionales y familias.

Esta demo permite explorar el diseño y los principales flujos de uso antes de desarrollar el sistema definitivo.

## Funcionalidades

### Administración

- Gestión de alumnos y sus datos básicos.
- Gestión de padres y tutores, con vinculación a sus hijos.
- Gestión de profesionales y asignación de alumnos.
- Creación y edición de categorías.
- Búsquedas y filtros para consultar la información.

### Profesionales

- Consulta de alumnos asignados.
- Creación de informes por área: entrenamiento, psicología y fisioterapia.
- Guardado de borradores y publicación de informes.
- Consulta de los informes propios.

### Padres y tutores

- Consulta del perfil y la categoría de sus hijos.
- Lectura de informes publicados por los profesionales.
- Visualización de avisos y notificaciones.
- Descarga de informes en PDF.

## Tecnologías

- HTML.
- CSS.
- JavaScript.
- Vite.
- jsPDF para generar informes en PDF.

## Ejecución local

Necesitás tener Node.js y npm instalados, en una versión compatible con Vite.

Cloná el repositorio:

```bash
git clone https://github.com/franalmada/academia-gol-demo.git
cd academia-gol-demo
```

Instalá las dependencias:

```bash
npm install
```

Iniciá el servidor de desarrollo:

```bash
npm run dev
```

Abrí en el navegador la dirección que aparezca en la terminal.

## Cómo probar la demo

1. Usá el selector de roles para explorar las vistas de administración, profesionales y familias.
2. Desde la vista de un profesional, seleccioná un alumno asignado y creá un informe.
3. Publicá el informe.
4. Cambiá a la vista del padre o tutor correspondiente para consultar la notificación, leer el informe y descargarlo en PDF.

Realizá este recorrido en la misma pestaña, sin recargar la página, para conservar los cambios de la sesión.

## Alcance de esta versión

Esta versión es una demostración de interfaz y funcionalidades:

- Utiliza datos de ejemplo.
- Los cambios se mantienen temporalmente en memoria y se pierden al recargar.
- No cuenta con un servidor ni una base de datos.
- El selector de roles simula las distintas vistas; no constituye un sistema de autenticación ni de permisos.
- Las notificaciones se muestran dentro de la demo; no se envían por correo ni WhatsApp.

Utilizá únicamente datos ficticios durante las pruebas.

## Próxima etapa

La versión definitiva requerirá autenticación, permisos validados en el servidor, almacenamiento persistente y despliegue para uso real.

El alcance final se definirá a partir de la revisión y aprobación del prototipo.
