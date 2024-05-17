'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const barbersData = [
      {
        name: 'Barber One',
        email: 'barber1@example.com',
        phone: 123456789,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Barber Two',
        email: 'barber2@example.com',
        phone: 987654321,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Barber Three',
        email: 'barber3@example.com',
        phone: 555555555,
        available: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Barber Four',
        email: 'barber4@example.com',
        phone: 777777777,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Barber Five',
        email: 'barber5@example.com',
        phone: 999999999,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Barbers', barbersData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Barbers', null, {});
  }
};
