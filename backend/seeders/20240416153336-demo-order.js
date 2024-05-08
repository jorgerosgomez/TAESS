const { Order } = require('../models');
const factory = require('../factories');
const faker = require('faker');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ordersData = [];

    for (let i = 0; i < 20; i++) {
      ordersData.push(factory.build('Order'));
    }

    await queryInterface.bulkInsert('Orders', ordersData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
