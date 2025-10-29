// Lógica pura extraída de src/pages/AdminNewProduct.jsx
(function(){
  window.AdminNewProductLogic = window.AdminNewProductLogic || {}

  // Validaciones básicas para el formulario
  window.AdminNewProductLogic.validateProductForm = function(formData){
    if(!formData) return { success:false, message:'Formulario vacío' }
    if(!formData.codigoProducto || String(formData.codigoProducto).length < 3) return { success:false, message:'El código del producto debe tener al menos 3 caracteres' }
    if(!formData.nombre) return { success:false, message:'El nombre del producto es requerido' }
    if(typeof formData.precio === 'undefined' || Number(formData.precio) < 0) return { success:false, message:'El precio debe ser mayor o igual a 0' }
    if(typeof formData.stock === 'undefined' || parseInt(formData.stock) < 0) return { success:false, message:'El stock debe ser mayor o igual a 0' }
    return { success:true }
  }

  // Determina si stock está en nivel crítico
  window.AdminNewProductLogic.isStockCritical = function(stock, stockCritico){
    var s = Number(stock) || 0
    var c = Number(stockCritico) || 0
    return c > 0 && s <= c
  }

  // Validación básica de imagen por tipo (extensiones)
  window.AdminNewProductLogic.validateImageFile = function(fileName){
    if(!fileName) return false
    var lower = String(fileName).toLowerCase()
    return lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.gif')
  }

})();
