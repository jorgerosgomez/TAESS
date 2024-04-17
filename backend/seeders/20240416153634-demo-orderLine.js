const { OrderLine } = require('../models');
const factory = require('../factories');
const faker = require('faker');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orderLinesData = [];

    // Generate 30 order lines using the OrderLineFactory
    for (let i = 0; i < 30; i++) {
      orderLinesData.push(factory.build('OrderLine'));
    }

    // Insert generated order lines into the database
    await queryInterface.bulkInsert('OrderLines', orderLinesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all order lines
    await queryInterface.bulkDelete('OrderLines', null, {});
  }
};
