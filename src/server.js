require('dotenv').config();
const express = require('express')
const logger = require('morgan')
const config = require('./config')
const productRouter = require('./resources/product/product.router')
const db = require('./utils/db')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// Routes
app.use('/v1/products', productRouter)

const start = async () => {
  try {
    // could connect to db but would need async /await
    // await connect()
    await db.sequelize.sync()
    console.log('Connection has been established successfully.');
    app.listen(config.port, () => {
      console.log(`API on http://localhost:${config.port}/product`)
    })
  } catch(e) {
    console.error(e)
  }
}

const serverModule = module.exports = app
serverModule.start = start