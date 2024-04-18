const { Reservation } = require('../models');
const factory = require('../factories');
const faker = require('faker');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const reservationsData = [];

    for (let i = 0; i < 25; i++) {
      reservationsData.push(factory.build('Reservation'));
    }

    await queryInterface.bulkInsert('Reservations', reservationsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reservations', null, {});
  }
};
