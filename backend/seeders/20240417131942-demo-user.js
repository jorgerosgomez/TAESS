'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = [
      {
        username: 'user1',
        password: await bcrypt.hash('password', 10),
        fullname: 'User One',
        email: 'user1@example.com',
        telephone: '123456789'
      },
      {
        username: 'user2',
        password: await bcrypt.hash('password', 10),
        fullname: 'User Two',
        email: 'user2@example.com',
        telephone: '987654321'
      },
      {
        username: 'user3',
        password: await bcrypt.hash('password', 10),
        fullname: 'User Three',
        email: 'user3@example.com',
        telephone: '555555555'
      },
      {
        username: 'user4',
        password: await bcrypt.hash('password', 10),
        fullname: 'User Four',
        email: 'user4@example.com',
        telephone: '777777777'
      },
      {
        username: 'user5',
        password: await bcrypt.hash('password', 10),
        fullname: 'User Five',
        email: 'user5@example.com',
        telephone: '999999999'
      }
    ];

    await queryInterface.bulkInsert('users', usersData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
