const Router = require('express').Router

const router = Router()

router
  .route('/') 
  .get((req, res) => {
    console.log('product route')
    res.send('hi dog')
  })
  .post()

router
  .route('/:id')
  .get()
  .put()
  .delete()

module.exports = router