const { Barber } = require('../models');
const factory = require('../factories');
const faker = require('faker');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const barbersData = [];

    for (let i = 0; i < 5; i++) {
      barbersData.push(factory.build('Barber'));
    }

    await queryInterface.bulkInsert('Barbers', barbersData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Barbers', null, {});
  }
};
