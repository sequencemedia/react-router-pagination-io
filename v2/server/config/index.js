/* eslint-disable */

module.exports = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        server: {
          v2: {
            connection: {
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
              port: 5002
            }
          }
        }
      }
  }
}
