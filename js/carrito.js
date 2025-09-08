// carrito.js

// Mostrar los productos en el carrito
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const productosCarrito = document.getElementById('productos-carrito');
  const totalCarrito = document.getElementById('totalCarrito');

  // Limpiar el contenido anterior
  productosCarrito.innerHTML = '';

  let total = 0;
  
  // Crear la lista de productos en el carrito
  carrito.forEach((producto) => {
    const productoElemento = document.createElement('div');
    productoElemento.classList.add('producto');
    
    productoElemento.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p class="muted">Precio: ${producto.precio}</p>
      <img src="${producto.imagen}" alt="${producto.nombre}">
    `;

    productosCarrito.appendChild(productoElemento);

    // Sumar el precio al total
    total += parseFloat(producto.precio.replace('$', '').replace(' CLP', '').replace('.', '').trim());
  });

  // Mostrar el total
  totalCarrito.textContent = `$${total.toLocaleString()} CLP`;
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', mostrarCarrito);
// carrito.js

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const productosCarrito = document.getElementById('productos-carrito');
  const totalCarrito = document.getElementById('totalCarrito');

  // Limpiar el contenido anterior
  productosCarrito.innerHTML = '';

  let total = 0;

  // Crear la lista de productos en el carrito
  carrito.forEach((producto, index) => {
    const productoElemento = document.createElement('div');
    productoElemento.classList.add('producto');
    
    productoElemento.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p class="muted">Precio: ${producto.precio}</p>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <button class="eliminar-btn" data-index="${index}">Eliminar</button>
    `;

    // Añadir evento para eliminar el producto
    productoElemento.querySelector('.eliminar-btn').addEventListener('click', () => {
      eliminarProducto(index);
    });

    productosCarrito.appendChild(productoElemento);

    // Sumar el precio al total
    total += parseFloat(producto.precio.replace('$', '').replace(' CLP', '').replace('.', '').trim());
  });

  // Mostrar el total
  totalCarrito.textContent = `$${total.toLocaleString()} CLP`;
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(index, 1);  // Eliminar el producto del array usando el índice
  localStorage.setItem('carrito', JSON.stringify(carrito));  // Guardar el carrito actualizado
  mostrarCarrito();  // Volver a mostrar el carrito actualizado
}

// Ejecutar la función al cargar la página