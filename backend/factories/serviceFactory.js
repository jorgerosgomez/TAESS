const faker = require('faker');

module.exports = (factory, Models) => {
  factory.define('Service', Models.Service, {
    name: faker.random.words(),
    description: faker.lorem.sentence(),
    duration: faker.datatype.number({ min: 15, max: 240 }),
    price: faker.datatype.float({ min: 0, max: 100, precision: 2 })
  });
};