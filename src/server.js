const express = require('express')
const logger = require('morgan')
const config = require('./config')
const productRouter = require('./resources/product/product.router')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// Routes
app.use('/v1/products', productRouter)

const start = () => {
  try {
    // could connect to db but would need async /await
    app.listen(config.port, () => {
      console.log(`API on http://localhost:${config.port}/product`)
    })
  } catch {
    console.error(e)
  }
}

const serverModule = module.exports = app
serverModule.start = start