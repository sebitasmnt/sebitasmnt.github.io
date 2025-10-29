/* Tests para AuthContextLogic */
describe('AuthContextLogic (Prueba)', function(){
  describe('validateLogin (Prueba)', function(){
    it('devuelve true for correct admin credentials', function(){
      var creds = window.AuthContextLogic._adminCredentials()
      expect(window.AuthContextLogic.validateLogin(creds.user, creds.password)).toBe(true)
    })

    it('devuelve false for incorrect credentials', function(){
      expect(window.AuthContextLogic.validateLogin('x','y')).toBe(false)
    })

    it('maneja vacío values', function(){
      expect(window.AuthContextLogic.validateLogin('','')).toBe(false)
    })
  })

  describe('validateAge (Prueba)', function(){
    it('devuelve true for >= 18', function(){
      expect(window.AuthContextLogic.validateAge(18)).toBe(true)
    })

    it('devuelve false for < 18', function(){
      expect(window.AuthContextLogic.validateAge(17)).toBe(false)
    })

    it('maneja no numérico', function(){
      expect(window.AuthContextLogic.validateAge('abc')).toBe(false)
    })
  })

  describe('validateNewPassword (Prueba)', function(){
    it('acepta password length >=4', function(){
      expect(window.AuthContextLogic.validateNewPassword('abcd')).toBe(true)
    })

    it('rechaza too short password', function(){
      expect(window.AuthContextLogic.validateNewPassword('a')).toBe(false)
    })

    it('rechaza non-string', function(){
      expect(window.AuthContextLogic.validateNewPassword(null)).toBe(false)
    })
  })
})
