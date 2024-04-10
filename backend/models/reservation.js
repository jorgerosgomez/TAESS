'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reservation.init({
    id_reservation: DataTypes.INTEGER,
    id_client: DataTypes.INTEGER,
    id_barber: DataTypes.INTEGER,
    date_reservation: DataTypes.DATE,
    id_service: DataTypes.INTEGER,
    duration_total: DataTypes.INTEGER,
    price_total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};