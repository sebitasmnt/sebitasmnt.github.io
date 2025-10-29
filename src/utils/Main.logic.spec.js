/* Tests para MainLogic */
describe('MainLogic (Prueba)', function(){
  it('init devuelve object with rendered true', function(){
    var res = window.MainLogic.init()
    expect(res && res.rendered === true).toBe(true)
  })

  it('init is estable across llama a', function(){
    expect(window.MainLogic.init().rendered).toBe(true)
    expect(window.MainLogic.init().rendered).toBe(true)
  })

  it('Prueba: init result not null', function(){
    expect(window.MainLogic.init()).not.toBe(null)
  })
})
