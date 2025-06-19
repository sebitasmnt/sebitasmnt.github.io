
// Login falso
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("loginError");

  if (email === "admin@frontera.cl" && password === "1234") {
    localStorage.setItem("usuario", "Administrador");
    window.location.href = "home.html";
  } else {
    errorMsg.style.display = "block";
  }
});

function enviarCorreo() {
  alert("Email enviado");
}
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

// Botón Scroll to Top
const btnUp = document.createElement("button");
btnUp.innerHTML = "⬆";
btnUp.id = "scrollTopBtn";
document.body.appendChild(btnUp);

btnUp.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

window.onscroll = () => {
  btnUp.style.display = window.scrollY > 300 ? "block" : "none";
};

// Validación simple de formularios
document.querySelectorAll("form-container").forEach(form => {
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

// Smooth Scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    const section = document.querySelector(this.getAttribute("href"));
    if (section) {
      e.preventDefault();
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.querySelector("registro-container")?.addEventListener("submit", function(e) {
  e.preventDefault();
  alert("✅ Registro completado exitosamente");
  this.reset();
});


document.addEventListener("DOMContentLoaded", () => {
  // Registro
  const registroForm = document.querySelector(".registro-grid");
  if (registroForm) {
    registroForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("✅ Usuario registrado con éxito");
      this.reset();
    });
  }

  // Trámite
  const tramiteForm = document.querySelector(".tramite-grid");
  if (tramiteForm) {
    tramiteForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("📦 Trámite recibido correctamente");
      this.reset();
    });
  }

  // Perfil (edición)
  const perfilForm = document.querySelector(".perfil-datos");
  if (perfilForm) {
    const editarBtn = document.querySelector(".btn-perfil.azul");
    if (editarBtn) {
      editarBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("👤 Perfil editado exitosamente");
      });
    }
  }
});
