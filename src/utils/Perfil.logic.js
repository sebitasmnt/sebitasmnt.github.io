// Lógica pura extraída de src/pages/Perfil.jsx
(function(){
  window.PerfilLogic = window.PerfilLogic || {}

  // Comprueba que nuevas contraseñas coincidan
  window.PerfilLogic.passwordsMatch = function(newPwd, confirmPwd){
    return String(newPwd) === String(confirmPwd)
  }

  // Formatea fecha ISO a formato local ES-CL
  window.PerfilLogic.formatDate = function(iso){
    try{
      var d = new Date(iso)
      return d.toLocaleDateString('es-CL')
    }catch(e){
      return ''
    }
  }

})();
