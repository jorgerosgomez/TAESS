'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      // Un servicio puede estar asociado con muchas reservas
      Service.hasMany(models.Reservation, {
        foreignKey: 'id_service',
        as: 'reservations'
      });
    }
  }

  Service.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER, 
    price: DataTypes.FLOAT 
  }, {
    sequelize,
    modelName: 'Service',
  });

  return Service;
};
