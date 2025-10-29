/* Tests para ProductosLogic */
describe('ProductosLogic (Prueba)', function(){
  describe('filterProducts (Prueba)', function(){
    var products = [
      { nombre: 'Catan', categoria: 'Juegos de Mesa' },
      { nombre: 'Carcassonne', categoria: 'Juegos de Mesa' },
      { nombre: 'Auriculares', categoria: 'Accesorios' }
    ]

    it('Prueba: filters by search term', function(){
      var out = window.ProductosLogic.filterProducts(products, 'catan', '')
      expect(out.length).toBe(1)
      expect(out[0].nombre).toBe('Catan')
    })

    it('Prueba: filters by category', function(){
      var out = window.ProductosLogic.filterProducts(products, '', 'Accesorios')
      expect(out.length).toBe(1)
      expect(out[0].categoria).toBe('Accesorios')
    })

    it('devuelve vacío array for inválido productos', function(){
      expect(Array.isArray(window.ProductosLogic.filterProducts(null,'',''))).toBe(true)
    })
  })

  describe('groupByCategory (Prueba)', function(){
    it('Prueba: groups products by category', function(){
      var products = [
        { nombre: 'A', categoria: 'X' },
        { nombre: 'B', categoria: 'X' },
        { nombre: 'C', categoria: 'Y' }
      ]
      var g = window.ProductosLogic.groupByCategory(products)
      expect(Object.keys(g).length).toBe(2)
      expect(g['X'].length).toBe(2)
      expect(g['Y'].length).toBe(1)
    })

    it('devuelve vacío object for null input', function(){
      var g = window.ProductosLogic.groupByCategory(null)
      expect(typeof g === 'object').toBe(true)
    })

    it('Prueba: keeps entries intact', function(){
      var products = [{ nombre:'Z', categoria: 'Z' }]
      var g = window.ProductosLogic.groupByCategory(products)
      expect(g['Z'][0].nombre).toBe('Z')
    })
  })
})
