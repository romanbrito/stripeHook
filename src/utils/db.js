const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
  }
)

// const connect = () => {
//   return sequelize.authenticate()
// }

const db = {
  Sequelize,
  sequelize,
}

// Insert models below
console.log(db.sequelize)
db.product = db.sequelize.import('../resources/product/product.model')

Object.keys(db).forEach((modelName) => {
  if ('classMethods' in db[modelName].options) {
    db[modelName].options.classMethods.associate(db)
  }
})

module.exports = db
