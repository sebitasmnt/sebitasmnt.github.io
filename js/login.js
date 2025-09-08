// login.js

// Lista de credenciales (usuario y contraseña)
const credenciales = {
    user: "admin@levelup.com",
    contraseña: "1234"
};

// Función para verificar el login
function verificarLogin() {
    // Obtener valores de los campos de entrada
    const usuario = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificar si las credenciales son correctas
    if (usuario === credenciales.user && password === credenciales.contraseña) {
        // Si son correctas, guardar en localStorage para verificar el login en el panel
        localStorage.setItem("auth", "true");  // Establecer como 'true' si el usuario es autenticado
        // Redirigir a la página de administración
        window.location.href = './index-admin.html';  // Redirige a la vista de administrador
    } else {
        // Si no, mostrar un mensaje de error
        alert('Usuario o contraseña incorrectos');
    }
}

// Vinculando el evento del botón
document.getElementById('loginBtn').addEventListener('click', function(e) {
    e.preventDefault();  // Prevenir el comportamiento por defecto del formulario
    verificarLogin();  // Verificar las credenciales
});
