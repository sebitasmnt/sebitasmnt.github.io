/* Tests para DetalleProductoLogic */
describe('DetalleProductoLogic (Prueba)', function(){
  describe('findProductByCode (Prueba)', function(){
    var products = [{ codigo: 'X' }, { codigo: 'Y' }]
    it('Prueba: finds existing product', function(){
      expect(window.DetalleProductoLogic.findProductByCode(products,'Y').codigo).toBe('Y')
    })

    it('devuelve null cuando not found', function(){
      expect(window.DetalleProductoLogic.findProductByCode(products,'Z')).toBe(null)
    })

    it('maneja inválido productos', function(){
      expect(window.DetalleProductoLogic.findProductByCode(null,'X')).toBe(null)
    })
  })

  describe('getRelatedProducts (Prueba)', function(){
    var products = [
      { codigo: '1', categoria: 'A' },
      { codigo: '2', categoria: 'A' },
      { codigo: '3', categoria: 'B' }
    ]
    it('devuelve related of same category', function(){
      var rel = window.DetalleProductoLogic.getRelatedProducts(products, { codigo: '1', categoria: 'A' }, 2)
      expect(rel.length).toBe(1)
      expect(rel[0].codigo).toBe('2')
    })

    it('Prueba: respects limit', function(){
      var rel = window.DetalleProductoLogic.getRelatedProducts(products, { codigo: '1', categoria: 'A' }, 1)
      expect(rel.length).toBe(1)
    })

    it('devuelve vacío cuando no producto', function(){
      expect(window.DetalleProductoLogic.getRelatedProducts(products, null, 2).length).toBe(0)
    })
  })

  describe('addMultipleToCart (Prueba)', function(){
    it('llama a callback quantity times', function(){
      var count = 0
      var fn = function(p){ count += 1 }
      var q = window.DetalleProductoLogic.addMultipleToCart(fn, { codigo: '1' }, 3)
      expect(q).toBe(3)
      expect(count).toBe(3)
    })

    it('devuelve 0 for no numérico quantity', function(){
      var count = 0
      var fn = function(){ count++ }
      var q = window.DetalleProductoLogic.addMultipleToCart(fn, { }, 'x')
      expect(q).toBe(0)
      expect(count).toBe(0)
    })

    it('maneja falta callback gracefully', function(){
      var q = window.DetalleProductoLogic.addMultipleToCart(null, {}, 2)
      expect(q).toBe(2)
    })
  })
})
