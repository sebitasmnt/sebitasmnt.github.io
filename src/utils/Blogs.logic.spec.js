/* Tests para BlogsLogic */
describe('BlogsLogic (Prueba)', function(){
  it('getPosts devuelve array of posts', function(){
    var posts = window.BlogsLogic.getPosts()
    expect(Array.isArray(posts)).toBe(true)
    expect(posts.length >= 1).toBe(true)
  })

  it('Prueba: posts have title and excerpt', function(){
    var posts = window.BlogsLogic.getPosts()
    var ok = posts.every(function(p){ return p.title && p.excerpt })
    expect(ok).toBe(true)
  })

  it('devuelve estable array', function(){
    expect(window.BlogsLogic.getPosts().length).toBe(window.BlogsLogic.getPosts().length)
  })
})
