// Lógica pura extraída de src/components/Footer.jsx
(function(){
  window.FooterLogic = window.FooterLogic || {}

  // Footer no tiene handlers; proveemos helper de rutas estáticas
  window.FooterLogic.getFooterLinks = function(){
    return [
      { to: '/', label: 'Inicio' },
      { to: '/productos', label: 'Productos' },
      { to: '/comunidad', label: 'Comunidad' }
    ]
  }

})();
