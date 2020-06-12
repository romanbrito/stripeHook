const Router = require('express').Router
const controllers = require('./product.controllers')

const router = Router()

router
  .route('/') 
  .get(controllers.getMany())
  .post(controllers.createOne())

router
  .route('/:id')
  .get()
  .put()
  .delete()

module.exports = router