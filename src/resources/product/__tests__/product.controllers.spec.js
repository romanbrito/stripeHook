const stripe = require('stripe')
const controllers = require('../product.controllers') 

// Mocking Stripe
jest.mock('stripe', () => {
  const originalModule = jest.requireActual('stripe')
 
  const createMock = jest
  .fn()
  .mockImplementation((prod, cb) => {
    const product = {
      "id": "2cf9e427-cc25-41a6-8f07-387118b5a07a",
      "object": "product",
      "active": true,
      "attributes": [],
      "created": 1592272892,
      "description": 'Beef, Grilled Onions, Cheddar Cheese, Cherry Peppers, Hickory Sauce',
      "images": ['https://rockingcms.com/uploads/TheHickory-SocialMedia`_40f7fdf460.jpeg'],
      "livemode": false,
      "metadata": {},
      "name": "The Hickory",
      "statement_descriptor": null,
      "type": "good",
      "unit_label": null,
      "updated": 1592273807
    }
    if (prod.id === '2cf9e427-cc25-41a6-8f07-387118b5a07a') {
      cb(null, product)
    } else {
      cb({ code: 'some error'})
    }
  })

  const retrieveMock = jest
    .fn()
    .mockImplementation((id, cb) => {
      console.log('retrieved id', id)
      if (id === 'c83bd69e-e3c7-433a-9e31-c9e7daed936a') { 
        const product = { id: 'c83bd69e-e3c7-433a-9e31-c9e7daed936a'}
        cb(null, product)
      } else {
        const err = { code: 'resource_missing'}
        cb(err, null)
      }
    })

  return function() {
    return { products: {
      retrieve: retrieveMock,
      create: createMock
    }}
  }
})

beforeEach(() => {
  const stripe = require('stripe')
  stripe().products.create.mockClear()
  stripe().products.retrieve.mockClear()
})

test('Case Product Exists', async () => {
  
  const req = { body: {
    entry: {
      uid: 'c83bd69e-e3c7-433a-9e31-c9e7daed936a'}
   }}
  
  const res = {
    status(status) {
      expect(status).toBe(200)
      return this
    },
    json(result) {
      expect(result.message.toString()).toBe('Product already exists')
    }
  }

  await controllers.createOne()(req, res)

})

test('Case Product Does Not Exist', async () => {
  
  const req = { body: {
    entry: {
      uid: 'uuasdfasjkk'}
   }}
  
  const res = {
    status(status) {
      expect(status).toBe(201)
      const stripe = require('stripe')()
      expect(stripe.products.retrieve).toHaveBeenCalled()
      return this 
    },
    json(result) {
    }
  }
  await controllers.createOne()(req, res)
})

test('Create Product', async () => {
  
  const req = { body: {
    entry: {
      uid: '2cf9e427-cc25-41a6-8f07-387118b5a07a',
      name: 'The Hickory',
      active: true,
      description: 'Beef, Grilled Onions, Cheddar Cheese, Cherry Peppers, Hickory Sauce',
      type: 'good',
      url: null,
      metadata: null,
      caption: 'The Hickory',
      shippable: false,
      category: 'signature_cheesesteaks',
      created_at: '2020-06-17T14:43:46.058Z',
      updated_at: '2020-06-17T14:43:46.058Z',
      images: [
        {
          id: 4,
          name: 'TheHickory-SocialMedia`',
          alternativeText: '',
          caption: '',
          width: 1080,
          height: 1080,
          formats: [Object],
          hash: 'TheHickory-SocialMedia`_40f7fdf460',
          ext: '.jpeg',
          mime: 'image/jpeg',
          size: 274.78,
          url: '/uploads/TheHickory-SocialMedia`_40f7fdf460.jpeg',
          previewUrl: null,
          provider: 'local',
          provider_metadata: null,
          created_at: '2020-06-17T14:43:39.097Z',
          updated_at: '2020-06-17T14:43:39.097Z'
        }
      ]
    }
    
  }}
  
  const res = {
    status(status) {
      expect(status).toBe(201)
      const stripe = require('stripe')()
      expect(stripe.products.create).toHaveBeenCalled()
      // expect(stripe.products.create).toHaveBeenCalledWith({
      //   id: '2cf9e427-cc25-41a6-8f07-387118b5a07a',
      //   name: 'The Hickory',
      //   active: true,
      //   description: 'Beef, Grilled Onions, Cheddar Cheese, Cherry Peppers, Hickory Sauce',
      //   type: 'good',
      //   url: null,
      //   metadata: null,
      //   caption: 'The Hickory',
      //   shippable: false,
      //   images: ['https://rockingcms.com/uploads/TheHickory-SocialMedia`_40f7fdf460.jpeg'],
      // }, (err, product) => {

      // })
      const expectedImages = [
        expect.stringMatching(/TheHickory/)
      ]
      expect(stripe.products.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          active: expect.any(Boolean),
          description: expect.any(String),
          type: expect.anything(),
          caption: expect.any(String),
          shippable: expect.any(Boolean),
          // images: expect.arrayContaining(expectedImages)
        }),
        expect.any(Function)
      )
      return this 
    },
    json(result) {
      // expect(result.data.toString()).toBe('hello')
    }
  }
  await controllers.createOne()(req, res)
})
// test('Create Product if Product does not exist ', async () => {

  
//   const res = {
//     status(status) {
//       expect(status).toBe(201)
//       return this
//     },
//     json(result) {
//       // create product
//       // expect(result.message.toString()).toBe('Product already exists')
//     }
//   }
//   await controllers.createOne()(req, res)
//   expect(stripe().products.create).toHaveBeenCalled()
// })

// const response = {
//   "id": "2cf9e427-cc25-41a6-8f07-387118b5a07a",
//   "object": "product",
//   "active": true,
//   "attributes": [],
//   "created": 1592272892,
//   "description": 'Beef, Grilled Onions, Cheddar Cheese, Cherry Peppers, Hickory Sauce',
//   "images": ['https://rockingcms.com/uploads/TheHickory-SocialMedia`_40f7fdf460.jpeg'],
//   "livemode": false,
//   "metadata": {},
//   "name": "The Hickory",
//   "statement_descriptor": null,
//   "type": "good",
//   "unit_label": null,
//   "updated": 1592273807
// }