const stripe = require('stripe')
const controllers = require('../product.controllers') 



// Mocking Stripe
jest.mock('stripe', () => {
  const originalModule = jest.requireActual('stripe')
 
  const createMock = jest
  .fn()
  .mockImplementationOnce((id, cb) => {
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
    const err = undefined
    cb(err, product)
  })

  const retrieveMock = jest
    .fn()
    .mockImplementationOnce((id, cb) => {
      const product = {
        "id": "c83bd69e-e3c7-433a-9e31-c9e7daed936a",
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
        
        const err = {
          code: 'resource_missing'
        }

      if (id !== 'c83bd69e-e3c7-433a-9e31-c9e7daed936a') {
        cb(err, undefined)
      } else {
        cb(undefined, product)
      }
    })

  return function() {
    return { products: {
      retrieve: retrieveMock,
      create: createMock
    }}
  }
})

test('Product Exists', async () => {
  const req = { body: {
    entry: {
      uid: 'c83bd69e-e3c7-433a-9e31-c9e7daed936a',
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
      expect(status).toBe(200)
      return this
    },
    json(result) {
      // product exists
      expect(result.message.toString()).toBe('Product already exists')
      
    }
  }
  await controllers.createOne()(req, res)

})

// test('Create Product if Product does not exist ', async () => {
//   const req = { body: {
//     entry: {
//       id: '2cf9e427-cc25-41a6-8f07-387118b5a07a',
//       name: 'The Hickory',
//       active: true,
//       description: 'Beef, Grilled Onions, Cheddar Cheese, Cherry Peppers, Hickory Sauce',
//       type: 'good',
//       url: null,
//       metadata: null,
//       caption: 'The Hickory',
//       shippable: false,
//       category: 'signature_cheesesteaks',
//       created_at: '2020-06-17T14:43:46.058Z',
//       updated_at: '2020-06-17T14:43:46.058Z',
//       images: [
//         {
//           id: 4,
//           name: 'TheHickory-SocialMedia`',
//           alternativeText: '',
//           caption: '',
//           width: 1080,
//           height: 1080,
//           formats: [Object],
//           hash: 'TheHickory-SocialMedia`_40f7fdf460',
//           ext: '.jpeg',
//           mime: 'image/jpeg',
//           size: 274.78,
//           url: '/uploads/TheHickory-SocialMedia`_40f7fdf460.jpeg',
//           previewUrl: null,
//           provider: 'local',
//           provider_metadata: null,
//           created_at: '2020-06-17T14:43:39.097Z',
//           updated_at: '2020-06-17T14:43:39.097Z'
//         }
//       ]
//     }
    
//   }}
  
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