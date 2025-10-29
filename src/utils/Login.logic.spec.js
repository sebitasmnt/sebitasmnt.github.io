/* Tests para LoginLogic */
describe('LoginLogic (Prueba)', function(){
  describe('validateLoginInput (Prueba)', function(){
    it('devuelve valid for non-vacío', function(){
      expect(window.LoginLogic.validateLoginInput('a@b','123').valid).toBe(true)
    })

    it('devuelve inválido for vacío email', function(){
      expect(window.LoginLogic.validateLoginInput('','123').valid).toBe(false)
    })

    it('devuelve inválido for vacío password', function(){
      expect(window.LoginLogic.validateLoginInput('a@b','').valid).toBe(false)
    })
  })

  describe('handleLoginSubmit (Prueba)', function(){
    it('devuelve error si loginFn falta', function(){
      var res = window.LoginLogic.handleLoginSubmit(null, { email:'a', password:'b' })
      expect(res.success).toBe(false)
    })

    it('Prueba: validates inputs before calling', function(){
      var called = false
      var loginFn = function(e,p){ called = true; return { success:true } }
      var res = window.LoginLogic.handleLoginSubmit(loginFn, { email:'', password:'' })
      expect(res.success).toBe(false)
      expect(called).toBe(false)
    })

    it('llama a loginFn with valid inputs', function(){
      var calledWith = null
      var loginFn = function(e,p){ calledWith = {e:e,p:p}; return { success:true } }
      var res = window.LoginLogic.handleLoginSubmit(loginFn, { email:'a@b', password:'123' })
      expect(res.success).toBe(true)
      expect(calledWith.e).toBe('a@b')
    })
  })
})
