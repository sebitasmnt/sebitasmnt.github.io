/* Tests para AdminNewUserLogic */
describe('AdminNewUserLogic (Prueba)', function(){
  describe('validateRUN (Prueba)', function(){
    it('acepta length >=7', function(){
      expect(window.AdminNewUserLogic.validateRUN('19011022K')).toBe(true)
    })

    it('rechaza too short', function(){
      expect(window.AdminNewUserLogic.validateRUN('12345')).toBe(false)
    })

    it('maneja null', function(){
      expect(window.AdminNewUserLogic.validateRUN(null)).toBe(false)
    })
  })

  describe('validateEmail (Prueba)', function(){
    it('acepta valid email', function(){
      expect(window.AdminNewUserLogic.validateEmail('a@b.com')).toBe(true)
    })

    it('rechaza inválido', function(){
      expect(window.AdminNewUserLogic.validateEmail('abc')).toBe(false)
    })

    it('maneja null', function(){
      expect(window.AdminNewUserLogic.validateEmail(null)).toBe(false)
    })
  })

  describe('getComunas (Prueba)', function(){
    it('devuelve list for region', function(){
      var map = { r1:['A','B'] }
      expect(window.AdminNewUserLogic.getComunas(map,'r1').length).toBe(2)
    })

    it('devuelve vacío for unknown', function(){
      expect(window.AdminNewUserLogic.getComunas({},'x').length).toBe(0)
    })

    it('maneja null map', function(){
      expect(window.AdminNewUserLogic.getComunas(null,'r1').length).toBe(0)
    })
  })
})
