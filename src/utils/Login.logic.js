// Lógica pura extraída de src/pages/Login.jsx
(function(){
  window.LoginLogic = window.LoginLogic || {}

  // Valida que email y password no estén vacíos
  window.LoginLogic.validateLoginInput = function(email, password){
    if(!email || !password) return { valid: false, message: 'Email y contraseña son requeridos' }
    return { valid: true }
  }

  // Ejecuta la acción de login usando la función proporcionada y devuelve el resultado
  window.LoginLogic.handleLoginSubmit = function(loginFn, formData){
    if(typeof loginFn !== 'function') return { success: false, message: 'loginFn no es una función' }
    var v = window.LoginLogic.validateLoginInput(formData.email, formData.password)
    if(!v.valid) return { success: false, message: v.message }
    return loginFn(formData.email, formData.password)
  }

})();
