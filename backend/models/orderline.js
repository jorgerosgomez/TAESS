'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderLine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderLine.belongsTo(models.Barber,{
        foreignKey: 'id_barber',
        as:'Barber'
      });
      OrderLine.belongsTo(models.Users,{
        foreignKey: 'id_user',
        as: 'Client'
      });
    }
  }
  OrderLine.init({
    id_client: DataTypes.INTEGER,
    id_barber: DataTypes.INTEGER,
    date_order: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OrderLine',
  });
  return OrderLine;
};