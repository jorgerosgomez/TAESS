'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      Reservation.belongsTo(models.Users, {
        foreignKey: 'id_user',
        as: 'Client'
      });
      // Una reserva pertenece a un barbero
      Reservation.belongsTo(models.Barber, {
        foreignKey: 'id_barber',
        as: 'Barber'
      });
      // Una reserva tiene asociado un servicio
      Reservation.belongsTo(models.Service, {
        foreignKey: 'id_service',
        as: 'Service'
      });
    }
  }

  Reservation.init({
    id_client: DataTypes.INTEGER,
    id_barber: DataTypes.INTEGER,
    date_reservation: DataTypes.DATE,
    id_service: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Reservation',
  });

  return Reservation;
};
