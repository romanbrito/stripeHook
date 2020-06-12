const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
  }
)

// Insert models below
const ProductModel = require('../resources/product/product.model')

const models = {
  ProductModel: ProductModel.init(sequelize)
}

// Run `.associate` it it exists,
// ie create realtionships in th ORM
Object.values(models)
  .filter(model => typeof model.associate === "funciton")
  .forEach(model => model.associate(models))

const db = {
  ...models,
  sequelize
}

module.exports = db
