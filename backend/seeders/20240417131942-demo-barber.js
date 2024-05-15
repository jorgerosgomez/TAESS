'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const barbersData = [
      {
        name: 'Barber One',
        password: 'password1',
        email: 'barber1@example.com',
        phone: 123456789,
        admin: true,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Barber Two',
        password: 'password2',
        email: 'barber2@example.com',
        phone: 987654321,
        admin: false,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Barber Three',
        password: 'password3',
        email: 'barber3@example.com',
        phone: 555555555,
        admin: false,
        available: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Barber Four',
        password: 'password4',
        email: 'barber4@example.com',
        phone: 777777777,
        admin: false,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Barber Five',
        password: 'password5',
        email: 'barber5@example.com',
        phone: 999999999,
        admin: true,
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
