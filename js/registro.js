document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registroForm');
  const mensajeDiv = document.createElement('div');
  mensajeDiv.id = 'mensajeRegistro';
  mensajeDiv.style.marginBottom = '1em';
  mensajeDiv.style.color = '#c0392b';
  form.parentNode.insertBefore(mensajeDiv, form);

  form.addEventListener('submit', function(e) {
    const edad = parseInt(document.getElementById('edad').value, 10);
    const email = form.querySelector('input[type="email"]').value.trim();
    mensajeDiv.textContent = ''; 

    if (isNaN(edad) || edad < 18) {
      mensajeDiv.textContent = 'Debes tener al menos 18 años para registrarte.';
      mensajeDiv.style.color = '#c0392b';
      e.preventDefault();
      return;
    }

    if (email.includes('@duocuc.cl')) {
      mensajeDiv.style.color = '#27ae60';
      mensajeDiv.textContent = '¡Cuenta creada! Recibirás un 20% de descuento de por vida en todos los productos por ser parte de Duoc UC.';
    } else {
      mensajeDiv.style.color = '#27ae60';
      mensajeDiv.textContent = '¡Cuenta creada!';
    }
  });
});