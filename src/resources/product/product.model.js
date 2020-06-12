const { Sequelize, Model, DataTypes } = require('sequelize')

class Product extends Model{
  static init(sequelize) {
    return super.init({
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
        // allowNull defaults to true
      }
    }, {
      sequelize,
      modelName: 'Product'
    })
  }
}

module.exports = Product

// var stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')

// class Product {
//   constructor(
//     name, 
//     description, 
//     price, 
//     images,
//     active,
//     metadata,
//     attributes,
//     caption,
//     deactivate_on,
//     package_dimensions,
//     shippable,
//     type,
//     url
//     ){
//       this.name, 
//       this.description, 
//       this.price, 
//       this.images,
//       this.active,
//       this.metadata,
//       this.attributes,
//       this.caption,
//       this.deactivate_on,
//       this.package_dimensions,
//       this.shippable,
//       this.type,
//       this.url
//     }

//     create() {
      
//     }
// }
