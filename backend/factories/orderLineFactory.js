const faker = require('faker');

module.exports = (factory, Models) => {
  factory.define('OrderLine', Models.OrderLine, {
    id_client: faker.datatype.number({ min: 1, max: 25 }),
    id_barber: faker.datatype.number({ min: 1, max: 5 }),
    date_order: faker.date.recent()
  });
};