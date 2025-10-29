/* Tests para AdminDashboardLogic */
describe('AdminDashboardLogic (Prueba)', function(){
  it('getQuickLinks devuelve list', function(){
    var l = window.AdminDashboardLogic.getQuickLinks()
    expect(Array.isArray(l)).toBe(true)
    expect(l.length >= 1).toBe(true)
  })

  it('Prueba: contains new-product link', function(){
    var l = window.AdminDashboardLogic.getQuickLinks()
    var found = false
    for(var i=0;i<l.length;i++) if(l[i].path === '/admin/new-product') found = true
    expect(found).toBe(true)
  })

  it('estable across llama a', function(){
    expect(window.AdminDashboardLogic.getQuickLinks().length).toBe(window.AdminDashboardLogic.getQuickLinks().length)
  })
})
