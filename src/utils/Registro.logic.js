// Lógica pura extraída de src/pages/Registro.jsx
(function(){
  window.RegistroLogic = window.RegistroLogic || {}

  // Comprueba que las contraseñas coincidan
  window.RegistroLogic.passwordsMatch = function(pw, confirm){
    return String(pw) === String(confirm)
  }

  // Valida edad mínima
  window.RegistroLogic.validateAge = function(edad){
    var n = Number(edad) || 0
    return n >= 18
  }

  // Realiza el flujo de registro usando registerFn
  window.RegistroLogic.registerFlow = function(registerFn, formData){
    if(typeof registerFn !== 'function') return { success:false, message: 'registerFn no es función' }
    if(!window.RegistroLogic.passwordsMatch(formData.password, formData.confirmarPassword)) return { success:false, message: 'Las contraseñas no coinciden' }
    if(!window.RegistroLogic.validateAge(formData.edad)) return { success:false, message: 'Debes tener al menos 18 años para registrarte.' }
    return registerFn(formData)
  }

})();
