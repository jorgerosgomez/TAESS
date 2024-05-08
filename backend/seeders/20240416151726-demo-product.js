const { Product } = require('../models');
const factory = require('../factories');
const faker = require('faker');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productsData = [];

    for (let i = 0; i < 25; i++) {
      productsData.push(factory.build('Product'));
    }

    await queryInterface.bulkInsert('Products', productsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
