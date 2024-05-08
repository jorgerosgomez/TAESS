
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Barber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Suponiendo que tu modelo de reservaciones se llama 'Reservation'
      Barber.hasMany(models.Reservation, {
        foreignKey: 'id_barber',
        as: 'Reservations' // El alias que usarás cuando incluyas Reservations en tus consultas
      });
    }
  };

  Barber.init({
    id_barber: DataTypes.INTEGER,
    name: DataTypes.STRING,
    password: DataTypes.STRING, // Asegúrate de almacenar contraseñas encriptadas
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    admin: DataTypes.BOOLEAN,
    available: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Barber',
  });

  return Barber;
};
