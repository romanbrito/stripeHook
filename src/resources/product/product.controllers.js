const Product = require('./product.model')

const controllers = {
  createOne() {
    return async (req, res) => {
      try {
        const doc = await Product.create({...req.body})
        res.status(201).json({ data: doc})
      } catch(e) {
        console.error(e)
        res.status(400).end()
      }
    }
  },
  getMany() {
    return async (req, res) => {
      try {
        const doc = await Product.findAll()
        res.status(201).json({ data: doc})
      } catch(e) {
        console.error(e)
        res.status(400).end()
      }
    }
  }
}

module.exports = controllers