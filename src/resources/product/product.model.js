module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING
  });

  Task.associate = function (models) {
    models.Task.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
};

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
