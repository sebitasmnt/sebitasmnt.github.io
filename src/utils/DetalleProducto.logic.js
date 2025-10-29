// Lógica pura extraída de src/pages/DetalleProducto.jsx
(function(){
  window.DetalleProductoLogic = window.DetalleProductoLogic || {}

  // Buscar producto por codigo
  window.DetalleProductoLogic.findProductByCode = function(productos, codigo){
    if(!Array.isArray(productos)) return null
    for(var i=0;i<productos.length;i++){
      if(productos[i].codigo === codigo) return productos[i]
    }
    return null
  }

  // Obtener relacionados por categoria, excluyendo el propio codigo
  window.DetalleProductoLogic.getRelatedProducts = function(productos, producto, limit){
    limit = Number(limit) || 4
    if(!producto || !producto.categoria) return []
    return (productos || []).filter(function(p){ return p.categoria === producto.categoria && p.codigo !== producto.codigo }).slice(0, limit)
  }

  // Ejecuta addToCart callback N veces (puedes pasar una función que acumule llamadas)
  window.DetalleProductoLogic.addMultipleToCart = function(addToCartFn, producto, quantity){
    quantity = Number(quantity) || 0
    for(var i=0;i<quantity;i++){
      if(typeof addToCartFn === 'function') addToCartFn(producto)
    }
    return quantity
  }

})();
