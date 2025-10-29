## Análisis de componentes (.jsx)

Resumen condensado del comportamiento principal de cada archivo `.jsx` del proyecto.

- `src/App.jsx` — Componente raíz que envuelve la aplicación con `AuthProvider` y `CartProvider`, monta `Header`/`Footer` y define las rutas públicas, de autenticación y de administración con React Router.

- `src/main.jsx` — Punto de entrada: renderiza `App` dentro de `React.StrictMode` e importa estilos globales.

- `src/components/Header.jsx` — Barra de navegación principal; muestra enlaces del sitio, el contador del carrito (desde `useCart`) y opciones según estado de autenticación (login/registro o perfil/admin). Maneja logout con confirmación.

- `src/components/Footer.jsx` — Pie de página estático con logo y enlaces rápidos; no contiene lógica de negocio.

- `src/components/AdminLayout.jsx` — Layout reutilizable para páginas de administración: sidebar con navegación, header con notificaciones y área principal donde se renderizan `children`; incluye botón de logout.

- `src/context/AuthContext.jsx` — Contexto de autenticación que maneja login/logout, registro, persistencia en `localStorage`, actualización de perfil y cambio de contraseña (simulado). Utiliza un reducer para controlar estados (`isAuthenticated`, `user`, `isLoading`).

- `src/context/CartContext.jsx` — Contexto del carrito con reducer para añadir, remover, actualizar cantidades y persistencia en `localStorage`. Provee utilitarios `getTotalItems` y `getTotalPrice`.

- `src/pages/Home.jsx` — Página de inicio estática con hero y secciones misión/visión; sirve como landing principal.

- `src/pages/Productos.jsx` — Catálogo con búsqueda por nombre y filtrado por categoría; agrupa productos por categoría, permite añadir al carrito y navegar al detalle.

- `src/pages/DetalleProducto.jsx` — Muestra el detalle de un producto seleccionado por `:codigo`, permite elegir cantidad y añadir al carrito; muestra productos relacionados.

- `src/pages/Carrito.jsx` — Vista del carrito que lista items, permite cambiar cantidades, eliminar productos y muestra el total calculado desde el contexto.

- `src/pages/Login.jsx` — Formulario de inicio de sesión que usa `AuthContext.login`; gestiona errores y redirección cuando el usuario se autentica.

- `src/pages/Registro.jsx` — Formulario de registro que valida contraseñas y edad mínima, llama a `AuthContext.register` y realiza auto-login tras el registro.

- `src/pages/Perfil.jsx` — Panel de perfil con pestañas para editar datos personales, cambiar contraseña y gestionar preferencias; usa `updateProfile` y `changePassword` del contexto.

- `src/pages/Blogs.jsx` — Página con entradas de blog estáticas; interfaz visual sin lógica compleja.

- `src/pages/Comunidad.jsx` — Página informativa sobre la comunidad, eventos y foros; estática.

- `src/pages/Contacto.jsx` — Formulario de contacto que valida en cliente y simula envío (alert + console.log), luego resetea el formulario.

- `src/pages/AdminDashboard.jsx` — Dashboard del panel admin que muestra accesos rápidos para crear/gestionar recursos; envuelto en `AdminLayout`.

- `src/pages/AdminNewProduct.jsx` — Formulario admin de creación de producto con validaciones, preview de imagen y alerta si el stock está en nivel crítico; simula guardado.

- `src/pages/AdminNewUser.jsx` — Formulario admin para crear usuarios con validaciones (RUN, correo, región/comuna dependiente) y reseteo tras registro simulado.

- `src/pages/AdminUsers.jsx` — Tabla de usuarios/órdenes con búsqueda, paginación client-side, acciones de editar/eliminar (simuladas) y estado visual por `status`.

---

Notas rápidas:
- Se usa `localStorage` para persistir sesión y carrito; muchas operaciones están simuladas (sin backend).
- `package.json` contiene scripts mezclados de Vite y `react-scripts`; conviene normalizar si se adopta Vite como bundler.

Archivo generado automáticamente a petición del usuario: resumen limitado a los archivos `.jsx`.
