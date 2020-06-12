const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  port: process.env.PORT
}

module.exports = baseConfig