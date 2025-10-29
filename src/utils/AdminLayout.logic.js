// Lógica pura extraída de src/components/AdminLayout.jsx
(function(){
  window.AdminLayoutLogic = window.AdminLayoutLogic || {}

  // isActive: compara pathname con itemPath
  window.AdminLayoutLogic.isActive = function(pathname, itemPath){
    return String(pathname) === String(itemPath)
  }

  // handleLogout puro similar al Header
  window.AdminLayoutLogic.handleLogout = function(logoutFn, confirmFn){
    if(typeof confirmFn !== 'function') confirmFn = function(){ return window.confirm('¿Estás seguro de que quieres cerrar sesión?') }
    var confirmed = !!confirmFn()
    if(confirmed && typeof logoutFn === 'function') logoutFn()
    return confirmed
  }

})();
