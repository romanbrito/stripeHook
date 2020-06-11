const Sequelize = require('sequelize')

  const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD,{
    host: 'localhost',
    dialect: 'postgres'
  })
  // const sequelize = new Sequelize(`postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@db:5432/${process.env.DATABASE}`)

const connect = () => {
  return sequelize.authenticate()
}

module.exports=connect
