# LuminaDev

Plataforma de gestión de productos y comercio electrónico desarrollada como proyecto académico.

## 📋 Descripción

LuminaDev es una aplicación web completa que permite la gestión y visualización de productos con funcionalidades de e-commerce. El proyecto está dividido en dos partes principales: un backend desarrollado con Node.js/Express y un frontend construido con React.

## 🏗️ Estructura del Proyecto

```
LuminaDev/
├── BackendLuminaDev/          # Backend de la aplicación
│   ├── src/
│   │   ├── app.js            # Configuración principal de Express
│   │   ├── config/           # Configuraciones (base de datos, etc.)
│   │   ├── controllers/      # Controladores de rutas
│   │   ├── models/           # Modelos de MongoDB
│   │   ├── routes/           # Definición de rutas
│   │   └── services/         # Lógica de negocio
│   ├── package.json
│   └── node_modules/
│
├── FrontLuminaDev/           # Frontend de la aplicación
│   ├── public/               # Archivos estáticos
│   │   └── index.html
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── ProductCard/
│   │   ├── pages/           # Páginas de la aplicación
│   │   │   ├── Home/
│   │   │   └── Products/
│   │   ├── services/        # Servicios API
│   │   ├── App.js           # Componente principal
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .env.example
│
├── README.md
└── .gitignore
```

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Nodemon** - Recarga automática del servidor en desarrollo

### Frontend
- **React** - Librería para construir interfaces de usuario
- **React Router** - Enrutamiento en la aplicación
- **Axios** - Cliente HTTP para realizar peticiones API
- **CSS3** - Estilos con metodología BEM

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- MongoDB (local o Atlas)
- npm o yarn

### Backend

1. Navega al directorio del backend:
```bash
cd BackendLuminaDev
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno (si es necesario)

4. Inicia el servidor:
```bash
npm start
```

El servidor debería estar corriendo en `http://localhost:3000`

### Frontend

1. Navega al directorio del frontend:
```bash
cd FrontLuminaDev
```

2. Instala las dependencias:
```bash
npm install
```

3. Copia el archivo `.env.example` a `.env` y ajusta las variables:
```bash
cp .env.example .env
```

4. Inicia la aplicación:
```bash
npm start
```

La aplicación debería abrir automáticamente en `http://localhost:3000` (o el siguiente puerto disponible)

## 📦 Modelos de Datos

### Usuario (User)
- Información de usuarios registrados
- Autenticación y autorización

### Producto (Product)
- Nombre, descripción, precio
- Categoría, stock
- Imagen

### Categoría (Category)
- Clasificación de productos

### Carrito (Cart)
- Productos agregados por usuario
- Cantidades

### Orden (Order)
- Historial de compras
- Estado de pedidos

## 🎨 Metodología CSS

El proyecto utiliza la metodología **BEM (Block Element Modifier)** para la nomenclatura de clases CSS:

- **Block**: Componente independiente (ej: `header`, `footer`, `product-card`)
- **Element**: Parte del componente (ej: `header__logo`, `footer__link`)
- **Modifier**: Variación del componente (ej: `button--primary`, `header__nav--open`)

Todos los archivos CSS tienen un prefijo que coincide con el nombre del componente para evitar conflictos de estilos.

## 📱 Características

- ✅ Diseño responsive (mobile-first)
- ✅ Sistema de navegación con Header y Footer
- ✅ Página de inicio con secciones hero y features
- ✅ Catálogo de productos con búsqueda y filtros
- ✅ Cards de productos con información detallada
- ✅ Integración con API REST del backend
- ✅ Sistema de gestión de estado
- ✅ Manejo de errores y estados de carga

## 🔜 Funcionalidades Pendientes

- [ ] Sistema de autenticación completo
- [ ] Carrito de compras funcional
- [ ] Proceso de checkout
- [ ] Panel de administración
- [ ] Perfil de usuario
- [ ] Sistema de valoraciones y comentarios
- [ ] Pasarela de pagos
- [ ] Notificaciones

## 👥 Equipo de Desarrollo

Proyecto desarrollado para el curso de **Gestión de Proyectos - 9º Semestre**  
Universidad del Valle

## 📄 Licencia

Este proyecto es de uso académico.

## 📞 Contacto

Para más información sobre el proyecto, contactar a través del repositorio.

---

**Última actualización:** Octubre 2025

