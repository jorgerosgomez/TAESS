const faker = require('faker');

module.exports = (factory, Models) => {
  factory.define('Product', Models.Product, {
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    stock: faker.datatype.number({ min: 0, max: 100 }),
    price: faker.datatype.float({ min: 0, max: 100, precision: 2 }),
    sales: faker.datatype.number({ min: 0, max: 100 }),
    stock_min: faker.datatype.number({ min: 0, max: 100 })
  });
};