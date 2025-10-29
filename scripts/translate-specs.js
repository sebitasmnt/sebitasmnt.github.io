const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..', 'src')

const replacements = [
  // common whole-phrases first (more specific)
  [/returns true when equal/gi, 'devuelve true cuando son iguales'],
  [/returns false when different/gi, 'devuelve false cuando son diferentes'],
  [/handles non-string/gi, 'maneja valores no string'],
  [/returns non-empty title/gi, 'devuelve título no vacío'],
  [/returns empty array when no items/gi, 'devuelve arreglo vacío cuando no hay elementos'],

  // generic token replacements
  [/\breturns\b/gi, 'devuelve'],
  [/\bhandles\b/gi, 'maneja'],
  [/\baccepts\b/gi, 'acepta'],
  [/\brejects\b/gi, 'rechaza'],
  [/\breturns error if\b/gi, 'devuelve error si'],
  [/\breturns error\b/gi, 'devuelve error'],
  [/\bcalls\b/gi, 'llama a'],
  [/\bwhen\b/gi, 'cuando'],
  [/\bif\b/gi, 'si'],
  [/\bmissing\b/gi, 'falta'],
  [/\binvalid\b/gi, 'inválido'],
  [/\bempty\b/gi, 'vacío'],
  [/\bstable\b/gi, 'estable'],
  [/\bacross calls\b/gi, 'entre llamadas'],
  [/\bnon-numeric\b/gi, 'no numérico'],
  [/\bnon-empty\b/gi, 'no vacío'],
  [/\bshould\b/gi, 'debería'],
  [/\bhandles missing callback gracefully\b/gi, 'maneja la falta de callback correctamente'],
  [/\bhandles missing logoutFn gracefully\b/gi, 'maneja la falta de logoutFn correctamente'],
  [/\bhandles null\b/gi, 'maneja null'],
  [/\bhandles nulls\b/gi, 'maneja nulls'],
  [/\breturns list for region\b/gi, 'devuelve lista para la región'],
  [/\breturns empty for unknown\b/gi, 'devuelve vacío para desconocido'],
  [/\breturns stable array\b/gi, 'devuelve arreglo estable'],
  [/\bgetHeroText returns object with title and cta\b/gi, 'getHeroText devuelve objeto con título y cta'],
  [/\bgetPosts returns array of posts\b/gi, 'getPosts devuelve arreglo de posts'],
  [/\bgetSections returns array\b/gi, 'getSections devuelve arreglo'],
  [/\bgetQuickLinks returns list\b/gi, 'getQuickLinks devuelve lista']
]

function walk(dir) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach(file => {
    const fp = path.join(dir, file)
    const stat = fs.statSync(fp)
    if (stat && stat.isDirectory()) results = results.concat(walk(fp))
    else if (/\.spec\.js$/.test(fp)) results.push(fp)
  })
  return results
}

const files = walk(root)
console.log('Archivos encontrados:', files.length)

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8')
  let original = content

  // Translate describe(...) strings: replace only the quoted description inside describe(...)
  content = content.replace(/(describe\s*\(\s*['`\"])([^'`\"]+)(['`\"]\s*,)/g, (m, p1, p2, p3) => {
    let desc = p2
    // apply replacements to desc
    replacements.forEach(([rgx, rep]) => { desc = desc.replace(rgx, rep) })
    // If nothing changed, try adding 'Prueba:' prefix for clarity
    if (desc === p2) desc = p2 + ' (Prueba)'
    return p1 + desc + p3
  })

  // Translate it(...) strings
  content = content.replace(/(it\s*\(\s*['`\"])([^'`\"]+)(['`\"]\s*,)/g, (m, p1, p2, p3) => {
    let itdesc = p2
    replacements.forEach(([rgx, rep]) => { itdesc = itdesc.replace(rgx, rep) })
    // if after replacements still looks English-ish, add Spanish prefix
    if (itdesc === p2) itdesc = 'Prueba: ' + p2
    return p1 + itdesc + p3
  })

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8')
    console.log('Traducido:', path.relative(process.cwd(), file))
  }
})

console.log('Traducción completada.')
