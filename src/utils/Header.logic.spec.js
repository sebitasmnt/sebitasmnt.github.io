/* Jasmine tests para HeaderLogic.handleLogout */
describe('HeaderLogic (Prueba)', function(){
  describe('handleLogout (Prueba)', function(){
    it('llama a logoutFn cuando confirmed (happy path)', function(){
      var called = false
      var logoutFn = function(){ called = true }
      var confirmFn = function(){ return true }
      var res = window.HeaderLogic.handleLogout(logoutFn, confirmFn)
      expect(res).toBe(true)
      expect(called).toBe(true)
    })

    it('does not call logoutFn cuando not confirmed', function(){
      var called = false
      var logoutFn = function(){ called = true }
      var confirmFn = function(){ return false }
      var res = window.HeaderLogic.handleLogout(logoutFn, confirmFn)
      expect(res).toBe(false)
      expect(called).toBe(false)
    })

    it('maneja falta logoutFn gracefully', function(){
      var confirmFn = function(){ return true }
      var res = window.HeaderLogic.handleLogout(null, confirmFn)
      expect(res).toBe(true)
    })
  })
})
