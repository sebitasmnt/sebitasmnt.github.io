// Lógica pura extraída de src/context/AuthContext.jsx
(function(){
  window.AuthContextLogic = window.AuthContextLogic || {}

  // Credenciales hardcodeadas
  window.AuthContextLogic._adminCredentials = function(){
    return { user: 'admin@levelup.com', password: '1234' }
  }

  // Valida credenciales: devuelve true si coinciden con admin hardcodeado
  window.AuthContextLogic.validateLogin = function(email, password){
    var creds = window.AuthContextLogic._adminCredentials()
    return String(email) === String(creds.user) && String(password) === String(creds.password)
  }

  // Crea el objeto user para el admin
  window.AuthContextLogic.buildAdminUser = function(email){
    return {
      id: '1',
      email: email,
      firstName: 'Admin',
      lastName: 'Level-Up',
      role: 'admin',
      createdAt: (new Date()).toISOString()
    }
  }

  // Valida edad mínima para registro
  window.AuthContextLogic.validateAge = function(edad){
    var n = Number(edad) || 0
    return n >= 18
  }

  // Construye nuevo objeto usuario a partir de userData (pura transformación)
  window.AuthContextLogic.buildNewUser = function(userData){
    return {
      id: String(Date.now()),
      email: userData.email,
      firstName: userData.nombre || '',
      lastName: userData.apellido || '',
      phone: userData.telefono || '',
      age: userData.edad || 0,
      address: userData.direccion || '',
      comuna: userData.comuna || '',
      region: userData.region || '',
      role: 'cliente',
      createdAt: (new Date()).toISOString(),
      preferences: { newsletter: false, notifications: true, theme: 'dark' }
    }
  }

  // Valida nueva contraseña mínima
  window.AuthContextLogic.validateNewPassword = function(newPassword){
    return typeof newPassword === 'string' && newPassword.length >= 4
  }

})();
