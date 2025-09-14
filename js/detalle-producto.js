document.addEventListener('DOMContentLoaded', cargarProducto);

function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const descripciones = {
  "JM001": "El clásico juego de estrategia Catan, ideal para reuniones y desafíos entre amigos.",
  "JM002": "Carcassonne: Expande tu territorio y desafía a tus rivales en este juego de mesa galardonado.",
  "AC001": "Controlador inalámbrico Xbox Series X, máxima precisión y comodidad para tus partidas.",
  "AC002": "Auriculares HyperX Cloud II, sonido envolvente y comodidad premium para gamers exigentes.",
  "CO001": "PlayStation 5, la consola de última generación para experiencias de juego inigualables.",
  "CG001": "PC Gamer ASUS ROG Strix, potencia y rendimiento extremo para los gamers más competitivos.",
  "SG001": "Silla Gamer Secretlab Titan, ergonomía y diseño para largas sesiones de juego.",
  "MS001": "Mouse Gamer Logitech G502 HERO, precisión y velocidad para dominar cualquier partida.",
  "MP001": "Mousepad Razer Goliathus Extended Chroma, superficie amplia y efectos RGB para tu setup.",
  "PP001": "Polera Gamer Personalizada 'Level-Up', muestra tu pasión gamer con estilo único.",
  "PL001": "Polerón Gamer con Logo Level-Up, abrígate y destaca como verdadero gamer."
};

async function cargarProducto() {
  const codigo = getParam('codigo');
  if (!codigo) return renderError();
  try {
    const res = await fetch('productos.json');
    const productos = await res.json();
    const producto = productos.find(p => p.codigo === codigo);
    if (producto) {
      renderProducto(producto, productos);
      renderRelacionados(producto, productos);
    } else {
      renderError();
    }
  } catch (err) {
    renderError();
  }
  actualizarCarritoUI();
}

function renderProducto(producto, productos) {
  const main = document.getElementById('main-detalle');
  // Para mockup: si hay más imágenes, se pueden agregar aquí. Por ahora solo una.
  const imagenes = [producto.imagen];
  main.innerHTML = `
    <div class="detalle-container">
      <div class="detalle-img">
        <img class="detalle-img-main" src="${producto.imagen}" alt="${producto.nombre}" id="mainImg">
        <div class="detalle-img-thumbs">
          ${imagenes.map((img, i) => `
            <img src="${img}" alt="Miniatura ${i+1}" class="detalle-img-thumb selected" data-img="${img}">
          `).join('')}
        </div>
      </div>
      <div class="detalle-info">
        <div class="detalle-nombre-precio">
          <div class="detalle-nombre">${producto.nombre}</div>
          <div class="detalle-precio">${producto.precio_texto || ''}</div>
        </div>
        <div class="detalle-descripcion">${descripciones[producto.codigo] || "Producto gamer de alta calidad."}</div>
        <form id="form-carrito">
          <div class="detalle-cantidad">
            <label for="cantidad">Cantidad:</label>
            <input type="number" id="cantidad" name="cantidad" min="1" value="1" required>
          </div>
          <button type="submit" class="btn-carrito"><i class="fa-solid fa-cart-plus"></i> Añadir al carrito</button>
        </form>
        <div id="mensajeCarrito" style="margin-top:10px;"></div>
      </div>
    </div>
  `;
  document.getElementById('form-carrito').addEventListener('submit', function(e) {
    e.preventDefault();
    const cantidad = parseInt(document.getElementById('cantidad').value, 10);
    if (isNaN(cantidad) || cantidad < 1) return;
    agregarAlCarrito(producto.codigo, cantidad);
  });

  // Miniaturas (mockup, solo una imagen)
  document.querySelectorAll('.detalle-img-thumb').forEach(thumb => {
    thumb.addEventListener('click', function() {
      document.getElementById('mainImg').src = this.dataset.img;
      document.querySelectorAll('.detalle-img-thumb').forEach(t => t.classList.remove('selected'));
      this.classList.add('selected');
    });
  });
}

function agregarAlCarrito(codigo, cantidad) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const idx = carrito.findIndex(item => item.codigo === codigo);
  if (idx >= 0) {
    carrito[idx].cantidad += cantidad;
  } else {
    carrito.push({ codigo, cantidad });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarritoUI();
  mostrarMensajeCarrito("Producto añadido al carrito.");
}

function actualizarCarritoUI() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoCount = document.getElementById('carritoCount');
  if (carritoCount) carritoCount.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

function mostrarMensajeCarrito(msg) {
  const div = document.getElementById('mensajeCarrito');
  div.textContent = msg;
  div.style.color = "#27ae60";
  setTimeout(() => { div.textContent = ""; }, 2000);
}

function renderError() {
  document.getElementById('main-detalle').innerHTML = `<div class="mensaje-error">Producto no encontrado</div>`;
  document.getElementById('relacionados').innerHTML = '';
}

// Productos relacionados (mockup: muestra 5 productos distintos)
function renderRelacionados(producto, productos) {
  const relacionados = productos.filter(p => p.codigo !== producto.codigo).slice(0, 5);
  const section = document.getElementById('relacionados');
  section.innerHTML = `
    <div class="relacionados-container">
      <div class="relacionados-title">Productos relacionados</div>
      <div class="relacionados-lista">
        ${relacionados.map(p => `
          <a href="detalle-producto.html?codigo=${p.codigo}" class="relacionado-item" title="${p.nombre}">
            <img src="${p.imagen}" alt="${p.nombre}">
          </a>
        `).join('')}
      </div>
    </div>
  `;
}