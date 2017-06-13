
module.exports = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        server: {
          v1: {
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
          v1: {
            connection: {
              host: 'localhost',
              port: 5001
            }
          }
        }
      }
  }
}
