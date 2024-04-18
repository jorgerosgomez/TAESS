'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const datosProductosBarberia = [
      {
        name: 'Crema de Afeitar',
        description: 'Una crema rica y cremosa para un afeitado suave.',
        stock: 50,
        price: 9.99,
        sales: 20,
        stock_min: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Aceite para Barba',
        description: 'Aceite nutritivo para mantener tu barba saludable y brillante.',
        stock: 30,
        price: 14.99,
        sales: 15,
        stock_min: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pomada para el Cabello',
        description: 'Un producto versátil para peinar el cabello con fijación fuerte y acabado mate.',
        stock: 40,
        price: 12.99,
        sales: 25,
        stock_min: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Navaja de Afeitar',
        description: 'Una navaja clásica para un afeitado preciso y limpio.',
        stock: 20,
        price: 29.99,
        sales: 10,
        stock_min: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tijeras de Barbero',
        description: 'Tijeras de grado profesional para cortes de cabello precisos.',
        stock: 15,
        price: 24.99,
        sales: 8,
        stock_min: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cortadora de Cabello',
        description: 'Cortadora de cabello potente para recortar el cabello sin esfuerzo.',
        stock: 10,
        price: 39.99,
        sales: 5,
        stock_min: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Brocha de Afeitar',
        description: 'Una brocha de alta calidad para hacer espuma de crema de afeitar.',
        stock: 25,
        price: 19.99,
        sales: 12,
        stock_min: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Peine para Barba',
        description: 'Peine de madera artesanal para peinar y estilizar barbas.',
        stock: 35,
        price: 9.99,
        sales: 18,
        stock_min: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Capa de Barbero',
        description: 'Capa impermeable y duradera para proteger la ropa durante los cortes de cabello.',
        stock: 30,
        price: 19.99,
        sales: 10,
        stock_min: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gel para Cabello',
        description: 'Gel de alta fijación para crear peinados elegantes y pulidos.',
        stock: 20,
        price: 11.99,
        sales: 8,
        stock_min: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Products', datosProductosBarberia, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
