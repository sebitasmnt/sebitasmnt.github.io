document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registroForm');
  // Crear el contenedor de mensajes y agregarlo arriba del formulario
  const mensajeDiv = document.createElement('div');
  mensajeDiv.id = 'mensajeRegistro';
  mensajeDiv.style.marginBottom = '1em';
  mensajeDiv.style.color = '#c0392b';
  form.parentNode.insertBefore(mensajeDiv, form);

  form.addEventListener('submit', function(e) {
    const edad = parseInt(document.getElementById('edad').value, 10);
    mensajeDiv.textContent = ''; // Limpiar mensaje anterior
    if (isNaN(edad) || edad < 18) {
      mensajeDiv.textContent = 'Debes tener al menos 18 años para registrarte.';
      e.preventDefault();
      return;
    }
    mensajeDiv.style.color = '#27ae60';
    mensajeDiv.textContent = '¡Cuenta creada!';
  });
});