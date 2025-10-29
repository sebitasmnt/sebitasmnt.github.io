/* Tests para ComunidadLogic */
describe('ComunidadLogic (Prueba)', function(){
  it('getSections devuelve array', function(){
    var s = window.ComunidadLogic.getSections()
    expect(Array.isArray(s)).toBe(true)
  })

  it('Prueba: contains Foros de Discusión', function(){
    var s = window.ComunidadLogic.getSections()
    var found = false
    for(var i=0;i<s.length;i++) if(s[i].title.indexOf('Foros') !== -1) found = true
    expect(found).toBe(true)
  })

  it('estable length across llama a', function(){
    expect(window.ComunidadLogic.getSections().length).toBe(window.ComunidadLogic.getSections().length)
  })
})
