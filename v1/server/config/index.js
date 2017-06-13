/* eslint-disable */

module.exports = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        server: {
          v1: {
            connection: {
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
              port: 5001
            }
          }
        }
      }
  }
}
