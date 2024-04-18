const { User } = require('../models');
const factory = require('../factories');
const faker = require('faker');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = [];

    for (let i = 0; i < 25; i++) {
      usersData.push(factory.build('User'));
    }

    await queryInterface.bulkInsert('Users', usersData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
