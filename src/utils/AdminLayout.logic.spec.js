/* Tests para AdminLayoutLogic */
describe('AdminLayoutLogic (Prueba)', function(){
  describe('isActive (Prueba)', function(){
    it('devuelve true cuando son iguales', function(){
      expect(window.AdminLayoutLogic.isActive('/admin','/admin')).toBe(true)
    })

    it('devuelve false cuando son diferentes', function(){
      expect(window.AdminLayoutLogic.isActive('/admin/dashboard','/admin')).toBe(false)
    })

    it('Prueba: coerces to string', function(){
      expect(window.AdminLayoutLogic.isActive(123,'123')).toBe(true)
    })
  })

  describe('handleLogout (Prueba)', function(){
    it('llama a logout cuando confirmed', function(){
      var called=false
      var logout = function(){ called=true }
      var confirmFn = function(){ return true }
      var res = window.AdminLayoutLogic.handleLogout(logout, confirmFn)
      expect(res).toBe(true)
      expect(called).toBe(true)
    })

    it('does not call logout cuando cancelled', function(){
      var called=false
      var logout = function(){ called=true }
      var confirmFn = function(){ return false }
      var res = window.AdminLayoutLogic.handleLogout(logout, confirmFn)
      expect(res).toBe(false)
      expect(called).toBe(false)
    })

    it('maneja falta logoutFn gracefully', function(){
      var confirmFn = function(){ return true }
      expect(window.AdminLayoutLogic.handleLogout(null, confirmFn)).toBe(true)
    })
  })
})
