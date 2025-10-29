/* Tests para AdminUsersLogic */
describe('AdminUsersLogic (Prueba)', function(){
  describe('getStatusClass/getStatusText (Prueba)', function(){
    it('Prueba: maps shipped', function(){
      expect(window.AdminUsersLogic.getStatusClass('shipped')).toBe('status-shipped')
      expect(window.AdminUsersLogic.getStatusText('shipped')).toBe('Shipped')
    })

    it('Prueba: maps pending', function(){
      expect(window.AdminUsersLogic.getStatusClass('pending')).toBe('status-pending')
    })

    it('Prueba: defaults for unknown', function(){
      expect(window.AdminUsersLogic.getStatusClass('x')).toBe('')
      expect(window.AdminUsersLogic.getStatusText('x')).toBe('x')
    })
  })

  describe('paginate (Prueba)', function(){
    it('Prueba: paginas correctamente', function(){
      var items = [1,2,3,4,5,6]
      var p1 = window.AdminUsersLogic.paginate(items,1,5)
      expect(p1.length).toBe(5)
      var p2 = window.AdminUsersLogic.paginate(items,2,5)
      expect(p2.length).toBe(1)
    })

    it('maneja inválido input', function(){
      expect(Array.isArray(window.AdminUsersLogic.paginate(null,1,5))).toBe(true)
    })

    it('Prueba: uses defaults', function(){
      var items = [1,2,3]
      expect(window.AdminUsersLogic.paginate(items).length).toBe(3)
    })
  })

  describe('filterUsers (Prueba)', function(){
    var users = [{ cliente:'Acme', numeroOrden:'#ORD-001' }, { cliente:'Bravo', numeroOrden:'#ORD-002' }]
    it('Prueba: filters by cliente', function(){
      var out = window.AdminUsersLogic.filterUsers(users,'acme')
      expect(out.length).toBe(1)
    })

    it('Prueba: filters by numeroOrden', function(){
      var out = window.AdminUsersLogic.filterUsers(users,'#ord-002')
      expect(out.length).toBe(1)
    })

    it('devuelve vacío for none', function(){
      var out = window.AdminUsersLogic.filterUsers(users,'zzz')
      expect(out.length).toBe(0)
    })
  })
})
