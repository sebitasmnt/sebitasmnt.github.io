/* Tests para HomeLogic */
describe('HomeLogic (Prueba)', function(){
  it('getHeroText devuelve object with title and cta', function(){
    var h = window.HomeLogic.getHeroText()
    expect(h.title.indexOf('Level-Up') !== -1).toBe(true)
    expect(typeof h.cta === 'string').toBe(true)
  })

  it('getHeroText estable across llama a', function(){
    expect(window.HomeLogic.getHeroText().cta).toBe(window.HomeLogic.getHeroText().cta)
  })

  it('devuelve título no vacío', function(){
    expect(window.HomeLogic.getHeroText().title.length > 0).toBe(true)
  })
})
