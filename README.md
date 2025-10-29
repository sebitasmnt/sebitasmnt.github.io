# Level-Up Gamer - React

Migración completa del proyecto Level-Up Gamer de HTML/CSS/JS a React.

## 🚀 Características

- **Framework**: React 18 con Vite
- **Routing**: React Router DOM
- **Estado Global**: Context API para carrito y autenticación
- **Autenticación**: Sistema completo de login/registro
- **Administración**: Panel de admin completo
- **Estilos**: CSS puro migrado del proyecto original
- **Responsive**: Diseño adaptativo para móviles y desktop

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx      # Navegación principal
│   ├── Footer.jsx      # Pie de página
│   └── AdminLayout.jsx # Layout para páginas de admin
├── pages/              # Páginas de la aplicación
│   ├── Home.jsx        # Página de inicio
│   ├── Productos.jsx   # Catálogo de productos
│   ├── Carrito.jsx     # Carrito de compras
│   ├── Comunidad.jsx   # Página de comunidad
│   ├── Blogs.jsx       # Blog de noticias
│   ├── Contacto.jsx    # Formulario de contacto
│   ├── DetalleProducto.jsx # Detalle de producto
│   ├── Login.jsx       # Página de login
│   ├── Registro.jsx    # Página de registro
│   ├── Perfil.jsx      # Perfil de usuario
│   ├── AdminDashboard.jsx # Dashboard de administración
│   ├── AdminNewUser.jsx # Crear nuevo usuario
│   ├── AdminNewProduct.jsx # Crear nuevo producto
│   └── AdminUsers.jsx  # Gestión de usuarios
├── context/            # Contextos de React
│   ├── CartContext.jsx # Estado global del carrito
│   └── AuthContext.jsx # Estado global de autenticación
├── data/               # Datos estáticos
│   └── productos.js    # Catálogo de productos
├── styles/             # Estilos CSS
│   └── index.css       # Estilos principales
├── App.jsx             # Componente principal
└── main.jsx            # Punto de entrada
```

## 🛍️ Funcionalidades

### Autenticación
- **Login**: Sistema de autenticación con credenciales
- **Registro**: Formulario completo de registro de usuarios
- **Perfil**: Gestión de información personal del usuario
- **Logout**: Cierre de sesión seguro
- **Persistencia**: Estado de autenticación guardado en localStorage

### Carrito de Compras
- Agregar productos al carrito
- Modificar cantidades
- Eliminar productos
- Persistencia en localStorage
- Cálculo automático del total

### Catálogo de Productos
- Búsqueda por nombre
- Filtrado por categorías
- Navegación entre productos
- Vista de detalle de producto

### Panel de Administración
- **Dashboard**: Vista general del panel de admin
- **Gestión de Usuarios**: Crear, editar y eliminar usuarios
- **Gestión de Productos**: Agregar nuevos productos al inventario
- **Formularios Avanzados**: Validación y manejo de errores
- **Navegación**: Sidebar con todas las opciones de admin

### Navegación
- React Router para navegación SPA
- Rutas protegidas por rol de usuario
- Navegación responsive
- Enlaces dinámicos según estado de autenticación

## 🎨 Diseño

- **Tema**: Gaming con colores neón
- **Colores principales**: 
  - Azul: #1E90FF
  - Verde neón: #39FF14
  - Fondo: #000000
- **Tipografías**: 
  - Orbitron (títulos)
  - Roboto (texto)

## 🚀 Instalación y Uso

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

3. **Construir para producción**:
   ```bash
   npm run build
   ```

4. **Vista previa de producción**:
   ```bash
   npm run preview
   ```

## 📦 Dependencias

### Principales
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `react-router-dom`: ^6.20.1

### Desarrollo
- `@vitejs/plugin-react`: ^4.1.1
- `vite`: ^5.0.0
- `eslint`: ^8.53.0

## 🔄 Migración Completada

### ✅ Componentes Migrados
- [x] Header con navegación dinámica
- [x] Footer con enlaces
- [x] Página de inicio (Hero + Misión/Visión)
- [x] Catálogo de productos con filtros
- [x] Carrito de compras funcional
- [x] Páginas de Comunidad, Blogs, Contacto
- [x] Detalle de producto con productos relacionados
- [x] Páginas de Login y Registro
- [x] Página de Perfil de usuario
- [x] Panel de administración completo
- [x] Layout de administración con sidebar

### ✅ Funcionalidades Migradas
- [x] Sistema de carrito con Context API
- [x] Sistema de autenticación completo
- [x] Gestión de usuarios y perfiles
- [x] Panel de administración funcional
- [x] Formularios de administración
- [x] Búsqueda de productos
- [x] Filtrado por categorías
- [x] Persistencia en localStorage
- [x] Navegación con React Router
- [x] Formulario de contacto
- [x] Validaciones de formularios
- [x] Manejo de errores y mensajes

### ✅ Estilos Migrados
- [x] Tema gaming completo
- [x] Diseño responsive
- [x] Animaciones y transiciones
- [x] Iconos Font Awesome
- [x] Estilos de administración
- [x] Estilos de autenticación
- [x] Estilos de perfil de usuario

## 🎯 Mejoras Implementadas

1. **Estado Global**: Uso de Context API para carrito y autenticación
2. **Componentización**: Código más modular y reutilizable
3. **Autenticación**: Sistema completo de login/registro con persistencia
4. **Administración**: Panel de admin funcional con formularios avanzados
5. **Performance**: React optimiza las re-renderizaciones
6. **Mantenibilidad**: Código más fácil de mantener y extender
7. **Validaciones**: Formularios con validación y manejo de errores
8. **Responsive**: Diseño adaptativo mejorado
9. **SEO**: Preparado para mejor SEO con React Router

## 🔐 Credenciales de Acceso

### Administrador
- **Email**: admin@levelup.com
- **Contraseña**: 1234

### Usuario Regular
- Puedes registrarte como usuario normal desde la página de registro
- Los usuarios de @duocuc.cl reciben 20% de descuento automático

## 📱 Responsive Design

El proyecto mantiene el diseño responsive original con mejoras:
- Grid adaptativo para productos
- Navegación móvil optimizada
- Formularios responsive
- Imágenes adaptativas

## 🔧 Scripts Disponibles

- `npm run dev`: Servidor de desarrollo
- `npm run build`: Construcción para producción
- `npm run preview`: Vista previa de la build
- `npm run lint`: Linter de código

---

**¡Migración completada exitosamente!** 🎉

El proyecto Level-Up Gamer ahora está completamente migrado a React manteniendo toda la funcionalidad original y mejorando la experiencia de desarrollo.

