'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ordersData = [
      {
        id_product: 1,
        price: 15.99,
        amount: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_product: 2,
        price: 19.99,
        amount: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_product: 3,
        price: 29.99,
        amount: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_product: 4,
        price: 17.99,
        amount: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_product: 5,
        price: 9.99,
        amount: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Orders', ordersData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
