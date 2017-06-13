
module.exports = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        server: {
          v2: {
            connection: {
              host: 'localhost',
              port: process.env.PORT
            }
          }
        }
      }
    default:
      return {
        server: {
          v2: {
            connection: {
              host: 'localhost',
              port: 5002
            }
          }
        }
      }
  }
}
