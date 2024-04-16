const { Service } = require('../models');
const factory = require('../factories');
const faker = require('faker');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const servicesData = [];

    for (let i = 0; i < 5; i++) {
      servicesData.push(factory.build('Service'));
    }

    await queryInterface.bulkInsert('Services', servicesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Services', null, {});
  }
};