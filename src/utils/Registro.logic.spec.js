/* Tests para RegistroLogic */
describe('RegistroLogic (Prueba)', function(){
  describe('passwordsMatch (Prueba)', function(){
    it('devuelve true cuando son iguales', function(){
      expect(window.RegistroLogic.passwordsMatch('a','a')).toBe(true)
    })

    it('devuelve false cuando son diferentes', function(){
      expect(window.RegistroLogic.passwordsMatch('a','b')).toBe(false)
    })

    it('maneja valores no string', function(){
      expect(window.RegistroLogic.passwordsMatch(null, undefined)).toBe(false)
    })
  })

  describe('validateAge (Prueba)', function(){
    it('acepta 18', function(){
      expect(window.RegistroLogic.validateAge(18)).toBe(true)
    })

    it('rechaza 17', function(){
      expect(window.RegistroLogic.validateAge(17)).toBe(false)
    })

    it('rechaza no numérico', function(){
      expect(window.RegistroLogic.validateAge('x')).toBe(false)
    })
  })

  describe('registerFlow (Prueba)', function(){
    it('devuelve error si registerFn falta', function(){
      var res = window.RegistroLogic.registerFlow(null, { password:'a', confirmarPassword:'a', edad:18 })
      expect(res.success).toBe(false)
    })

    it('devuelve error si passwords do not match', function(){
      var res = window.RegistroLogic.registerFlow(function(){}, { password:'a', confirmarPassword:'b', edad:18 })
      expect(res.success).toBe(false)
    })

    it('llama a registerFn for valid data', function(){
      var called=false
      var fn = function(fd){ called=true; return { success:true } }
      var res = window.RegistroLogic.registerFlow(fn, { password:'a', confirmarPassword:'a', edad:18 })
      expect(res.success).toBe(true)
      expect(called).toBe(true)
    })
  })
})
