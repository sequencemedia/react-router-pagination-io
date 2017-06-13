const path = require('path')

const processCwd = process.cwd()
const clientPath = path.resolve(processCwd, 'client')
const serverPath = path.resolve(processCwd, 'server')
const publicPath = path.resolve(processCwd, 'public')
const configPath = path.resolve(serverPath, 'config')

module.exports = {
  public: {
    app: [
      path.join(publicPath, 'assets/js')
    ]
  },
  client: {
    app: [
      path.resolve(clientPath, '**/*.js')
    ]
  },
  webpack: {
    run: require(path.resolve(configPath, 'webpack'))
  }
}
