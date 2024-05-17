
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.OrderLine, {
        foreignKey: 'id_user',
        as: 'Orders'
      });

      Users.hasMany(models.Reservation, {
        foreignKey: 'id_user',
        as: 'Reservations'
      })
    }
  };

  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING, // Asegúrate de almacenar contraseñas encriptadas
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    administrador: DataTypes.BOOLEAN,
    telephone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });

  return Users;
};
