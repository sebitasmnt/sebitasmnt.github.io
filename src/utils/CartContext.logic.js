// Lógica pura extraída de src/context/CartContext.jsx
(function(){
  window.CartContextLogic = window.CartContextLogic || {}

  // Añade producto o incrementa quantity si existe
  window.CartContextLogic.addOrIncrement = function(items, producto){
    if(!Array.isArray(items)) items = []
    var found = false
    var out = items.map(function(item){
      if(item.codigo === producto.codigo){
        found = true
        return Object.assign({}, item, { quantity: (item.quantity || 0) + 1 })
      }
      return item
    })
    if(!found){
      out.push(Object.assign({}, producto, { quantity: 1 }))
    }
    return out
  }

  // Remove item by codigo
  window.CartContextLogic.removeItem = function(items, codigo){
    if(!Array.isArray(items)) return []
    return items.filter(function(i){ return i.codigo !== codigo })
  }

  // Update quantity (if <=0 remove)
  window.CartContextLogic.updateQuantity = function(items, codigo, quantity){
    if(!Array.isArray(items)) return []
    quantity = Number(quantity) || 0
    if(quantity <= 0) return window.CartContextLogic.removeItem(items, codigo)
    return items.map(function(i){
      if(i.codigo === codigo) return Object.assign({}, i, { quantity: quantity })
      return i
    })
  }

  // getTotalItems
  window.CartContextLogic.getTotalItems = function(items){
    if(!Array.isArray(items)) return 0
    return items.reduce(function(total, item){ return total + (item.quantity || 0) }, 0)
  }

  // getTotalPrice
  window.CartContextLogic.getTotalPrice = function(items){
    if(!Array.isArray(items)) return 0
    return items.reduce(function(total, item){ return total + ((item.precio || 0) * (item.quantity || 0)) }, 0)
  }

})();
