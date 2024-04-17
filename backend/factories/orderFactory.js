const faker = require('faker');

module.exports = (factory, Models) => {
  factory.define('Order', Models.Order, {
    id_product: faker.datatype.number({ min: 1, max: 10 }),
    price: faker.datatype.float({ min: 0, max: 100, precision: 2 }),
    amount: faker.datatype.number({ min: 1, max: 25 }),
  });
};