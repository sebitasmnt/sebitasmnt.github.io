/* Tests para FooterLogic */
describe('FooterLogic (Prueba)', function(){
  it('getFooterLinks devuelve array with at least 3 links', function(){
    var links = window.FooterLogic.getFooterLinks()
    expect(Array.isArray(links)).toBe(true)
    expect(links.length >= 3).toBe(true)
  })

  it('Prueba: each link has to and label', function(){
    var links = window.FooterLogic.getFooterLinks()
    var ok = links.every(function(l){ return l.to && l.label })
    expect(ok).toBe(true)
  })

  it('Prueba: contains /productos link', function(){
    var links = window.FooterLogic.getFooterLinks()
    var found = false
    for(var i=0;i<links.length;i++){
      if(links[i].to === '/productos') { found = true; break }
    }
    expect(found).toBe(true)
  })
})
