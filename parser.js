const fs = require('fs')

const raw = fs.readFileSync('lemmatized.txt', 'utf-8')
const items = raw.split('\n')
const mapped = items.map((st) => {
  const [count, txt] = st.split('\t')
  if (!txt) return {}

  const words = txt.split(' ')
  const ix = words.indexOf('__UNDEF__')
  return {
    count: +count,
    verb: words[0].toLowerCase(),
    place: words[ix + 1].toLowerCase()
  }
})

const cities = {}
mapped.forEach(({ place, verb, count }) => {
  if (!cities[place]) cities[place] = {}
  if (!cities[place][verb]) cities[place][verb] = 0
  cities[place][verb] += count
})
fs.writeFileSync('cities.json', JSON.stringify(cities))

const verbs = {}
mapped.forEach(({ place, verb, count }) => {
  if (!verbs[verb]) verbs[verb] = {}
  if (!verbs[verb][place]) verbs[verb][place] = 0
  verbs[verb][place] += count
})
fs.writeFileSync('verbs.json', JSON.stringify(verbs))
