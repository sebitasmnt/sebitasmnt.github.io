document.addEventListener('DOMContentLoaded', function() {
  const buscador = document.getElementById('buscadorInput');
  const secciones = document.querySelectorAll('.producto-lista');

  buscador.addEventListener('input', function() {
    const filtro = buscador.value.toLowerCase();

    secciones.forEach(lista => {
      const productos = lista.querySelectorAll('.juego');
      productos.forEach(prod => {
        const nombreElem = prod.querySelector('h2');
        const nombre = nombreElem ? nombreElem.textContent.toLowerCase() : '';
        if (nombre.includes(filtro)) {
          prod.style.display = '';
        } else {
          prod.style.display = 'none';
        }
      });
    });
  });
});

// productos.js

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  // Obtener el carrito actual del localStorage (si no existe, inicializarlo como un array vacío)
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Agregar el producto al carrito
  carrito.push(producto);

  // Guardar el carrito actualizado en el localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Actualizar la interfaz de usuario del carrito (opcional, solo para mostrar un contador de productos)
  actualizarCarritoUI();
}

// Actualizar la interfaz de usuario del carrito (contador de productos en el icono del carrito)
function actualizarCarritoUI() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoCount = document.getElementById('carritoCount');
  if (carritoCount) {
    carritoCount.textContent = carrito.length;
  }
}

// Escuchar los clics en los botones de "Agregar al carrito"
document.querySelectorAll('.btn-carrito').forEach((button) => {
  button.addEventListener('click', (event) => {
    const productoElemento = event.target.closest('.juego'); // Obtén el elemento del producto
    const nombre = productoElemento.querySelector('h2').textContent;
    const precio = productoElemento.querySelector('.precio').textContent;
    const imagen = productoElemento.querySelector('img').src;

    const producto = {
      nombre,
      precio,
      imagen
    };

    agregarAlCarrito(producto);
  });
});

// Ejecutar al cargar la página para actualizar el carrito
document.addEventListener('DOMContentLoaded', actualizarCarritoUI);
