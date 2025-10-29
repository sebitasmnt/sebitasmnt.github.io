// Lógica pura extraída de src/pages/Carrito.jsx
(function(){
  window.CarritoLogic = window.CarritoLogic || {}

  // Formatea precio numérico a string CLP
  window.CarritoLogic.formatPrice = function(price){
    var n = Number(price) || 0
    return '$' + n.toLocaleString() + ' CLP'
  }

  // Calcula total (fallback si no se usa contexto)
  window.CarritoLogic.calculateTotalPrice = function(items){
    if(!Array.isArray(items)) return 0
    return items.reduce(function(total, item){ return total + ((item.precio || 0) * (item.quantity || 0)) }, 0)
  }

})();
