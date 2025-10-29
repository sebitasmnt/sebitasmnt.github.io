// Lógica pura extraída de src/components/Header.jsx
(function(){
  window.HeaderLogic = window.HeaderLogic || {}

  /**
   * handleLogout equivalente puro.
   * logoutFn: function to call when confirmed
   * confirmFn: function that should return boolean (default window.confirm)
   * Returns true if logoutFn was called, false otherwise
   */
  window.HeaderLogic.handleLogout = function(logoutFn, confirmFn){
    if(typeof confirmFn !== 'function'){
      confirmFn = function(msg){ return window.confirm(msg) }
    }
    var confirmed = !!confirmFn('¿Estás seguro de que quieres cerrar sesión?')
    if(confirmed){
      if(typeof logoutFn === 'function') logoutFn()
      return true
    }
    return false
  }

})();
