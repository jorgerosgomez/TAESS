'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const reservationsData = [
      {
        id_client: 1,
        id_barber: 1,
        date_reservation: new Date(),
        id_service: 1,
        duration_total: 30,
        price_total: 20.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_client: 2,
        id_barber: 2,
        date_reservation: new Date(),
        id_service: 2,
        duration_total: 45,
        price_total: 25.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_client: 3,
        id_barber: 3,
        date_reservation: new Date(),
        id_service: 3,
        duration_total: 60,
        price_total: 30.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Agrega aquí las demás entradas
      {
        id_client: 4,
        id_barber: 4,
        date_reservation: new Date(),
        id_service: 4,
        duration_total: 45,
        price_total: 35.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_client: 5,
        id_barber: 5,
        date_reservation: new Date(),
        id_service: 5,
        duration_total: 60,
        price_total: 40.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_client: 2,
        id_barber: 3,
        date_reservation: new Date(),
        id_service: 6,
        duration_total: 30,
        price_total: 25.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ];

    await queryInterface.bulkInsert('Reservations', reservationsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reservations', null, {});
  }
};
