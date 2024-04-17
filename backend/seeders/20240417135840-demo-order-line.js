'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orderLinesData = [
      {
        id_client: 1,
        id_barber: 1,
        date_order: new Date()
      },
      {
        id_client: 2,
        id_barber: 2,
        date_order: new Date()
      },
      {
        id_client: 3,
        id_barber: 3,
        date_order: new Date()
      },
      {
        id_client: 4,
        id_barber: 4,
        date_order: new Date()
      },
      {
        id_client: 5,
        id_barber: 5,
        date_order: new Date()
      },
      {
        id_client: 1,
        id_barber: 2,
        date_order: new Date()
      },
      {
        id_client: 2,
        id_barber: 3,
        date_order: new Date()
      },
      {
        id_client: 3,
        id_barber: 4,
        date_order: new Date()
      },
      {
        id_client: 4,
        id_barber: 5,
        date_order: new Date()
      },
      {
        id_client: 5,
        id_barber: 1,
        date_order: new Date()
      },
      {
        id_client: 1,
        id_barber: 3,
        date_order: new Date()
      },
      {
        id_client: 2,
        id_barber: 4,
        date_order: new Date()
      }
    ];

    await queryInterface.bulkInsert('OrderLines', orderLinesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OrderLines', null, {});
  }
};
