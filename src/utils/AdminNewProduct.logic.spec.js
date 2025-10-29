/* Tests para AdminNewProductLogic */
describe('AdminNewProductLogic (Prueba)', function(){
  describe('validateProductForm (Prueba)', function(){
    it('valid form devuelve success', function(){
      var form = { codigoProducto:'ABC', nombre:'X', precio:10, stock:5 }
      expect(window.AdminNewProductLogic.validateProductForm(form).success).toBe(true)
    })

    it('inválido cuando codigo corto', function(){
      var form = { codigoProducto:'AB', nombre:'X', precio:10, stock:5 }
      expect(window.AdminNewProductLogic.validateProductForm(form).success).toBe(false)
    })

    it('inválido cuando negative price', function(){
      var form = { codigoProducto:'ABC', nombre:'X', precio:-1, stock:5 }
      expect(window.AdminNewProductLogic.validateProductForm(form).success).toBe(false)
    })
  })

  describe('isStockCritical (Prueba)', function(){
    it('true cuando stock <= stockCritico', function(){
      expect(window.AdminNewProductLogic.isStockCritical(5,5)).toBe(true)
    })

    it('false cuando stock > stockCritico', function(){
      expect(window.AdminNewProductLogic.isStockCritical(6,5)).toBe(false)
    })

    it('false cuando no stockCritico', function(){
      expect(window.AdminNewProductLogic.isStockCritical(5,0)).toBe(false)
    })
  })

  describe('validateImageFile (Prueba)', function(){
    it('acepta png/jpg/gif', function(){
      expect(window.AdminNewProductLogic.validateImageFile('a.png')).toBe(true)
      expect(window.AdminNewProductLogic.validateImageFile('b.JPG')).toBe(true)
    })

    it('rechaza other extensions', function(){
      expect(window.AdminNewProductLogic.validateImageFile('x.txt')).toBe(false)
    })

    it('maneja null', function(){
      expect(window.AdminNewProductLogic.validateImageFile(null)).toBe(false)
    })
  })
})
