const Fontmin = require('fontmin')
const ttf2woff2 = require('./fontmin-ttf2woff2')
const glob = require('glob')
const fs = require('fs')

const srcPath = ['script/font/dbs.ttf', 'script/font/rsc.ttf', 'script/font/xht.ttf', 'script/font/xy.ttf']
const destPath = 'src/assets/font/'
let text = ''
for (let i = 33; i < 127; i++) {
  text += String.fromCharCode(i)
}

const readString = (file) => {
  return new Promise((rev, rej) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) rej(err)
      rev(data)
    })
  })
}

const appendText = (str) => {
  let len = str.length
  for (let i = 0; i < len; i++) {
    if (!text.includes(str[i])) {
      text += str[i]
    }
  }
}

const start = (src, txt, removeJa = false) => {
  if (removeJa) {
    txt = txt.replace(/[\u3040-\u30ff\uff66-\uff9f]/g, '')
  }
  const fontmin = new Fontmin()
  .src(src)
  .use(Fontmin.glyph({
      text: txt,
      hinting: false
  }))
  .use(ttf2woff2({ clone: false }))
  .dest(destPath)

  fontmin.run(function (err, files, stream) {
    if (err) {
      console.error(err)
    }
  })
}

glob('src/**/{*.vue,*.json}', function (err, files) {
  if (err) {
    console.error(err)
  }
  const prims = files.map(file => {
    return readString(file)
  })

  Promise.all(prims).then(txts => {
    txts.forEach(appendText)
    console.log(text)
    console.log(text.length + '个字符')
    start(srcPath[0], text)
    start(srcPath[1], text)
    start(srcPath[2], text)
    start(srcPath[3], text)
  })
})
