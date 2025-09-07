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