// Lógica pura extraída de src/pages/Productos.jsx
(function(){
  window.ProductosLogic = window.ProductosLogic || {}

  // Filtra productos por nombre y categoría
  window.ProductosLogic.filterProducts = function(productos, searchTerm, selectedCategory){
    if(!Array.isArray(productos)) return []
    var s = (searchTerm || '').toLowerCase()
    return productos.filter(function(producto){
      var matchesSearch = producto.nombre.toLowerCase().indexOf(s) !== -1
      var matchesCategory = !selectedCategory || producto.categoria === selectedCategory
      return matchesSearch && matchesCategory
    })
  }

  // Agrupa por categoría
  window.ProductosLogic.groupByCategory = function(productos){
    var grouped = {}
    (productos || []).forEach(function(producto){
      if(!grouped[producto.categoria]) grouped[producto.categoria] = []
      grouped[producto.categoria].push(producto)
    })
    return grouped
  }

})();
