const fs = require('fs')

const actions = async () => {
  const oldIndex = await fs.readFileSync('./build/index.html').toString()
  const i1 = oldIndex.indexOf('<script>'), i2 = oldIndex.indexOf('</script>')
  //const i = oldIndex.search(reg)
  //console.log(oldIndex.replace(reg, '<script src="/static/js/first.js"></script>'))
  const script = oldIndex.substr(i1 + 8, i2 - i1 - 8)
  fs.writeFileSync('./build/static/js/first.js', script)
  const newIndex = oldIndex.replace('>' + script, ' src="./static/js/first.js">')
  fs.writeFileSync('./build/index.html', newIndex)
}

actions()