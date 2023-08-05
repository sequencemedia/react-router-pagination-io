require('@babel/register')({
  extensions: [
    '.mjs',
    '.jsx'
  ]
})

const {
  default: component
} = require('./index.mjs')

module.exports = component
