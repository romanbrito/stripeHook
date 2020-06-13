const Sequelize = require('sequelize')
// const db = require('../../../utils/db')
const ProductModel = require('../product.model')
const { beforeBulkCreate } = require('../product.model')


// Mocking Sequelize
jest.mock('sequelize',() => { 
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('sequelize')
  class Model {}
  Model.init = jest.fn()

  return {
    ...originalModule,
    Model
  }
})

beforeEach(() => {
  const { Model } = require('sequelize')
  Model.init.mockClear()
})

describe('Product Model', () => {
  describe('schema', () => {
    test('It called ProductModel.init with the correct parameters', () => {
      const { Model, DataTypes } = require('sequelize')
      const sequelize = jest.fn()
      ProductModel.init(sequelize)
      expect(Model.init).toHaveBeenCalledTimes(1)

      Model.init.mock.calls.forEach(args => {
        expect(args).toEqual([{
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          description: {
            type: DataTypes.STRING
          }
        },
        {
          modelName: 'Product',
          sequelize
        }])
      })
    })
  })
})

// { event: 'trigger-test', created_at: '2020-06-10T02:38:36.254Z' }
// {
//   event: 'entry.update',
//   created_at: '2020-06-10T02:40:00.257Z',
//   model: 'dish',
//   entry: {
//     id: 1,
//     name: "Founder's Favorite",
//     description: 'Beef, grilled onions, mozarella, mustard blend, jalapeños',
//     price: 875,
//     priceId: 'temp',
//     restaurant: {
//       id: 1,
//       name: 'Texadelphia McAllen',
//       description: 'McAllen Location',
//       created_at: '2020-05-24T20:17:45.464Z',
//       updated_at: '2020-05-24T20:17:45.464Z',
//       restaurant_hours: [Array],
//       image: [Array]
//     },
//     stripeId: null,
//     created_at: '2020-05-26T03:20:40.903Z',
//     updated_at: '2020-06-10T02:40:00.195Z',
//     size: null,
//     category: null,
//     apiId: null,
//     image: [ [Object] ]
//   }
// }
