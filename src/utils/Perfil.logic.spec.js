/* Tests para PerfilLogic */
describe('PerfilLogic (Prueba)', function(){
  describe('passwordsMatch (Prueba)', function(){
    it('devuelve true for equal', function(){
      expect(window.PerfilLogic.passwordsMatch('x','x')).toBe(true)
    })

    it('devuelve false for different', function(){
      expect(window.PerfilLogic.passwordsMatch('a','b')).toBe(false)
    })

    it('maneja nulls', function(){
      expect(window.PerfilLogic.passwordsMatch(null,null)).toBe(true)
    })
  })

  describe('formatDate (Prueba)', function(){
    it('Prueba: formats ISO date', function(){
      var iso = new Date('2025-01-01').toISOString()
      expect(typeof window.PerfilLogic.formatDate(iso)).toBe('string')
    })

    it('devuelve vacío for inválido', function(){
      expect(window.PerfilLogic.formatDate('invalid')).toBe('')
    })

    it('maneja null', function(){
      expect(window.PerfilLogic.formatDate(null)).toBe('')
    })
  })
})
