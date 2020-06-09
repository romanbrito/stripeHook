const express = require('express')
const logger = require('morgan')
const config = require('./config')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// Routes
const start = () => {
  try {
    // could connect to db but would need async /await
    app.listen(config.port, () => {
      console.log(`API on http://localhost:${config.port}`)
    })
  } catch {
    console.error(e)
  }
}

const serverModule = module.exports = app
serverModule.start = start