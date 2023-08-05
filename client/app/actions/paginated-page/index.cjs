require('@babel/register')({
  extensions: [
    '.mjs',
    '.jsx'
  ]
})

module.exports = require('./index.mjs')
