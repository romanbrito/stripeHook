const stripe = require('stripe')(process.env.STRIPE)
const Product = require('./product.model')

const controllers = {
  createOne() {
    return async (req, res) => {
      try {
        // const doc = await Product.create({...req.body})
        // res.status(201).json({ data: doc})
        const {event, entry} = req.body
        stripe.products.retrieve(
          entry.uid,
          function(err, product) {
            // asynchronously called
            if(product) {
              console.log('Product already exists')
              res.status(200).json({ message: 'Product already exists'})
            } else if(err.code === 'resource_missing') {
              console.log('creating product')
              // const {product} = entry
              // const stripeProduct = {...product, id: entry.uid}
              // console.log('---Stripe Product----', stripeProduct)
              // stripe.products.create(product, (err, product) => {
              //   console.log('---create----')
              // })
              res.status(201).json({ data: 'hello'})
            } else {
              throw(err)
            }
          }
        )


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