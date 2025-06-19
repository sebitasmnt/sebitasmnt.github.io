// Toast
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hidden');
  }, 3000);
}

// Login
function initLogin() {
  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pwd = document.getElementById('password').value;
    if (email && pwd) {
      localStorage.setItem('user', email);
      showToast('Inicio de sesión exitoso');
      setTimeout(() => location.href = 'home.html', 1000);
    }
  });
  document.getElementById('forgotPwd').addEventListener('click', () => {
    showToast('Email de recuperación enviado');
  });
}

// Registration
function initRegister() {
  document.getElementById('registerForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('emailReg').value;
    const pwd = document.getElementById('passwordReg').value;
    const confirm = document.getElementById('confirmPwd').value;
    if (pwd !== confirm) {
      showToast('Las contraseñas no coinciden');
      return;
    }
    localStorage.setItem('user', email);
    showToast('Registro exitoso');
    setTimeout(() => location.href = 'index.html', 1000);
  });
}

// Home
function initHome() {
  const user = localStorage.getItem('user') || 'Usuario';
  document.getElementById('userName').textContent = user;
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('user');
    location.href = 'index.html';
  });
}

// Tramite
function initTramite() {
  document.getElementById('tramiteForm').addEventListener('submit', e => {
    e.preventDefault();
    const tipo = document.getElementById('tipo').value;
    const detalle = document.getElementById('detalle').value;
    if (tipo && detalle) {
      showToast('Trámite registrado');
      document.getElementById('tramiteForm').reset();
    }
  });
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('user');
    location.href = 'index.html';
  });
}

// Profile
function initProfile() {
  const user = localStorage.getItem('user') || 'Usuario';
  document.getElementById('profileName').textContent = user.split('@')[0];
  document.getElementById('profileEmail').textContent = user;
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('user');
    location.href = 'index.html';
  });
}
