/* Tests para CartContextLogic */
describe('CartContextLogic (Prueba)', function(){
  describe('addOrIncrement (Prueba)', function(){
    it('adds new item cuando not present', function(){
      var items = []
      var p = { codigo: 'A1', nombre: 'X' }
      var out = window.CartContextLogic.addOrIncrement(items, p)
      expect(out.length).toBe(1)
      expect(out[0].quantity).toBe(1)
    })

    it('increments quantity cuando present', function(){
      var items = [{ codigo: 'A1', quantity: 2 }]
      var p = { codigo: 'A1' }
      var out = window.CartContextLogic.addOrIncrement(items, p)
      expect(out.length).toBe(1)
      expect(out[0].quantity).toBe(3)
    })

    it('Prueba: does not modify other items', function(){
      var items = [{ codigo: 'A1', quantity:1 }, { codigo: 'B2', quantity:2 }]
      var p = { codigo: 'C3' }
      var out = window.CartContextLogic.addOrIncrement(items, p)
      expect(out.length).toBe(3)
    })
  })

  describe('removeItem (Prueba)', function(){
    it('Prueba: removes matching codigo', function(){
      var items = [{ codigo: 'A1' }, { codigo: 'B2' }]
      var out = window.CartContextLogic.removeItem(items, 'A1')
      expect(out.length).toBe(1)
      expect(out[0].codigo).toBe('B2')
    })

    it('devuelve arreglo vacío cuando no hay elementos', function(){
      expect(window.CartContextLogic.removeItem(null,'x').length).toBe(0)
    })

    it('Prueba: does not remove non-matching', function(){
      var items = [{ codigo: 'A1' }]
      var out = window.CartContextLogic.removeItem(items, 'Z')
      expect(out.length).toBe(1)
    })
  })

  describe('updateQuantity (Prueba)', function(){
    it('updates quantity cuando >0', function(){
      var items = [{ codigo: 'A1', quantity:1 }]
      var out = window.CartContextLogic.updateQuantity(items, 'A1', 5)
      expect(out[0].quantity).toBe(5)
    })

    it('removes cuando quantity <=0', function(){
      var items = [{ codigo: 'A1', quantity:1 }]
      var out = window.CartContextLogic.updateQuantity(items, 'A1', 0)
      expect(out.length).toBe(0)
    })

    it('maneja inválido items gracefully', function(){
      var out = window.CartContextLogic.updateQuantity(null, 'A1', 3)
      expect(Array.isArray(out)).toBe(true)
    })
  })

  describe('totals (Prueba)', function(){
    it('Prueba: getTotalItems sums quantities', function(){
      var items = [{ quantity:2 }, { quantity:3 }]
      expect(window.CartContextLogic.getTotalItems(items)).toBe(5)
    })

    it('Prueba: getTotalPrice sums precio * quantity', function(){
      var items = [{ precio:10, quantity:2 }, { precio:5, quantity:3 }]
      expect(window.CartContextLogic.getTotalPrice(items)).toBe(35)
    })

    it('devuelve 0 for null input', function(){
      expect(window.CartContextLogic.getTotalItems(null)).toBe(0)
      expect(window.CartContextLogic.getTotalPrice(null)).toBe(0)
    })
  })
})
