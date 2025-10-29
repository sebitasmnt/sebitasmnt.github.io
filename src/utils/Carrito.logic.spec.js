/* Tests para CarritoLogic */
describe('CarritoLogic (Prueba)', function(){
  describe('formatPrice (Prueba)', function(){
    it('Prueba: formats integer price', function(){
      expect(window.CarritoLogic.formatPrice(1000)).toBe('$1,000 CLP')
    })

    it('Prueba: formats zero price', function(){
      expect(window.CarritoLogic.formatPrice(0)).toBe('$0 CLP')
    })

    it('maneja no numérico gracefully', function(){
      expect(window.CarritoLogic.formatPrice('abc')).toBe('$0 CLP')
    })
  })

  describe('calculateTotalPrice (Prueba)', function(){
    it('Prueba: sums precio * quantity', function(){
      var items = [{ precio:10, quantity:2 }, { precio:5, quantity:3 }]
      expect(window.CarritoLogic.calculateTotalPrice(items)).toBe(35)
    })

    it('devuelve 0 for null', function(){
      expect(window.CarritoLogic.calculateTotalPrice(null)).toBe(0)
    })

    it('maneja falta fields', function(){
      var items = [{}, { precio:10 }]
      expect(window.CarritoLogic.calculateTotalPrice(items)).toBe(0)
    })
  })
})
