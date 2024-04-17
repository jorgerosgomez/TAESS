
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const servicesData = [
      {
        name: 'Corte de cabello',
        description: 'Corte de cabello básico',
        duration: 30,
        price: 15.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Afeitado clásico',
        description: 'Afeitado con navaja y masaje facial',
        duration: 45,
        price: 19.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tinte de cabello',
        description: 'Aplicación de tinte para cambiar el color del cabello',
        duration: 60,
        price: 29.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Barba completa',
        description: 'Recorte y diseño de barba con aceites y lociones',
        duration: 40,
        price: 17.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Manicura',
        description: 'Cuidado y embellecimiento de las uñas de las manos',
        duration: 20,
        price: 9.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pedicura',
        description: 'Cuidado y embellecimiento de las uñas de los pies',
        duration: 30,
        price: 14.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Depilación de cejas',
        description: 'Modelado y depilación de cejas para una apariencia pulida',
        duration: 15,
        price: 7.99,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Services', servicesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Services', null, {});
  }
};
