// Lógica pura extraída de src/pages/AdminNewUser.jsx
(function(){
  window.AdminNewUserLogic = window.AdminNewUserLogic || {}

  // Valida RUN (mínimo 7 caracteres, permitiendo K)
  window.AdminNewUserLogic.validateRUN = function(run){
    if(!run) return false
    var s = String(run).replace(/\.|\-/g,'')
    return s.length >= 7 && s.length <= 9
  }

  // Valida correo simple
  window.AdminNewUserLogic.validateEmail = function(correo){
    if(!correo) return false
    return correo.indexOf('@') !== -1
  }

  // Obtiene comunas para region desde mapping
  window.AdminNewUserLogic.getComunas = function(comunasMap, region){
    if(!comunasMap || !region) return []
    return comunasMap[region] || []
  }

})();
