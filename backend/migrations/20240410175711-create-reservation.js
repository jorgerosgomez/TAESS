'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_client: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_barber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date_reservation: {
        type: Sequelize.DATE,
        allowNull: false
      },
      id_service: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      duration_total: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price_total: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reservations');
  }
};
