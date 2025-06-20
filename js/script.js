// Scroll Reveal Animations
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

sections.forEach(sec => {
  sec.classList.add("hidden");
  observer.observe(sec);
});

// Validación simple de formularios
document.querySelectorAll(".form-container").forEach(form => {
  form.addEventListener("submit", function(e) {
    let valid = true;
    const requiredInputs = form.querySelectorAll("input[required]");
    requiredInputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.border = "2px solid red";
        valid = false;
      } else {
        input.style.border = "2px solid green";
      }
    });
    if (!valid) {
      e.preventDefault();
      alert("Por favor completa todos los campos requeridos.");
    }
  });
});

// Función auxiliar para guardar datos del registro
const registroForm = document.querySelector(".registro-grid");
if (registroForm) {
  registroForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputs = registroForm.querySelectorAll("input");
    const datos = {};
    inputs.forEach((input) => {
      const key = input.placeholder.replace(/[^a-zA-Z]/g, "").toLowerCase();
      datos[key] = input.value.trim();
    });

    if (datos.email && datos.contrasea) {
      localStorage.setItem(`usuario-${datos.email}`, JSON.stringify(datos));
      localStorage.setItem("usuarioActual", datos.email);
      alert("✅ Usuario registrado con éxito");
      registroForm.reset();
      window.location.href = "home.html";
    } else {
      alert("❌ Faltan datos importantes");
    }
  });
}

// Login desde login.html
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("loginError");

    const user = JSON.parse(localStorage.getItem(`usuario-${email}`));

    if (user && user.contrasea === password) {
      localStorage.setItem("usuarioActual", email);
      window.location.href = "home.html";
    } else {
      errorMsg.style.display = "block";
    }
  });
}

// Mostrar info del usuario en el perfil
document.addEventListener("DOMContentLoaded", () => {
  const perfilInputs = document.querySelectorAll(".perfil-datos input");
  const emailActual = localStorage.getItem("usuarioActual");

  if (emailActual && perfilInputs.length > 0) {
    const user = JSON.parse(localStorage.getItem(`usuario-${emailActual}`));
    if (user) {
      perfilInputs.forEach(input => {
        const label = input.previousElementSibling?.innerText?.toLowerCase();
        let key = "";

        if (label.includes("nombre")) key = "nombres";
        else if (label.includes("apellido")) {
          const paterno = user.apellidopaterno || "";
          const materno = user.apellidomaterno || "";
          input.value = `${paterno} ${materno}`.trim();
          return;
        }
        else if (label.includes("email")) key = "email";
        else if (label.includes("nacionalidad")) key = "nacionalidad";

        if (key && user[key]) {
          input.value = user[key];
        }
      });
    }
  }



  // Perfil edición
  const editarBtn = document.querySelector(".btn-perfil.azul");
  if (editarBtn) {
    editarBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("👤 Perfil editado exitosamente");
    });
  }
});

// Recuperar contraseña
function enviarCorreo() {
  alert("📧 Se ha enviado un correo de recuperación");
}

// Mostrar nombre y foto en perfil
document.addEventListener("DOMContentLoaded", () => {
  const emailActual = localStorage.getItem("usuarioActual");
  const nombreElemento = document.getElementById("nombreUsuario");
  const avatarImg = document.querySelector(".perfil-avatar img");

  if (emailActual) {
    const user = JSON.parse(localStorage.getItem(`usuario-${emailActual}`));
    if (user) {
      const nombreCompleto = `${user.nombres || ""} ${user.apellidopaterno || ""} ${user.apellidomaterno || ""}`.trim();
      if (nombreElemento) nombreElemento.textContent = nombreCompleto;

      // Cargar imagen desde localStorage si existe
      const fotoGuardada = localStorage.getItem(`foto-${emailActual}`);
      if (fotoGuardada && avatarImg) {
        avatarImg.src = fotoGuardada;
      }
    }
  }

  // Subir nueva foto de perfil
  const subirFotoInput = document.getElementById("subirFoto");
  if (subirFotoInput) {
    subirFotoInput.addEventListener("change", function () {
      const archivo = this.files[0];
      if (archivo && archivo.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const dataURL = e.target.result;
          localStorage.setItem(`foto-${emailActual}`, dataURL);
          if (avatarImg) {
            avatarImg.src = dataURL;
          }
          alert("📷 Foto de perfil actualizada");
        };
        reader.readAsDataURL(archivo);
      } else {
        alert("❌ El archivo no es una imagen válida");
      }
    });
  }
});

// Guardar los trámites en localStorage desde el formulario
document.getElementById("tramiteForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const usuario = localStorage.getItem("usuarioActual");

  // Recogemos los datos del formulario con 'name' como clave
  const datosTramite = {
    nombre: document.querySelector('input[name="nombre"]').value.trim(),
    vehiculo: document.querySelector('input[name="vehiculo"]').value.trim(),
    menorEdad: document.querySelector('input[name="menorEdad"]').value.trim(),
    producto: document.querySelector('input[name="producto"]').value.trim(),
    mascota: document.querySelector('input[name="mascota"]').value.trim(),
    archivo: document.querySelector('input[name="archivo"]').files[0] ? document.querySelector('input[name="archivo"]').files[0].name : 'Sin archivo',
    sag: document.querySelector('input[name="sag"]').value.trim(),
    pasaporte: document.querySelector('input[name="pasaporte"]').value.trim(),
    estado: Math.random() > 0.3 ? "aprobado" : "rechazado"
  };

  // Guardamos el trámite en localStorage
  const tramites = JSON.parse(localStorage.getItem(`tramites-${usuario}`)) || [];
  tramites.push(datosTramite);
  localStorage.setItem(`tramites-${usuario}`, JSON.stringify(tramites));

  alert("✅ Trámite enviado correctamente");
  this.reset();
});

// Mostrar los trámites en la página tramites.html
document.addEventListener("DOMContentLoaded", () => {
  const usuario = localStorage.getItem("usuarioActual");

  const tramites = JSON.parse(localStorage.getItem(`tramites-${usuario}`)) || [];
  const lista = document.getElementById("tramites-lista");
  lista.innerHTML = ""; // Limpiar cualquier contenido previo

  if (tramites.length === 0) {
    lista.innerHTML = "<p>No tienes trámites registrados.</p>";
    return;
  }

  tramites.forEach((tramite, index) => {
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
      <h3>Trámite ${index + 1}</h3>
      <p><strong>Nombre:</strong> ${tramite.nombre}</p>
      <p><strong>Tipo de vehículo:</strong> ${tramite.vehiculo}</p>
      <p><strong>¿Menor de edad?:</strong> ${tramite.menorEdad}</p>
      <p><strong>Producto a declarar:</strong> ${tramite.producto}</p>
      <p><strong>¿Ingresará una mascota?:</strong> ${tramite.mascota}</p>
      <p><strong>Declaración SAG:</strong> ${tramite.sag}</p>
      <p><strong>Pasaporte vigente:</strong> ${tramite.pasaporte}</p>
      <p><strong>Archivo subido:</strong> ${tramite.archivo}</p>
      <button class="btn ${tramite.estado === 'aprobado' ? 'aprobado' : 'rechazado'}">
        <i class="fas fa-${tramite.estado === 'aprobado' ? 'check' : 'times'}-circle"></i> ${tramite.estado.charAt(0).toUpperCase() + tramite.estado.slice(1)}
      </button>
    `;
    lista.appendChild(item);


  });
});
