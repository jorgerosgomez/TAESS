const faker = require('faker');

module.exports = (factory, Models) => {
  factory.define('Reservation', Models.Reservation, {
    id_client: faker.datatype.number({ min: 1, max: 10 }),
    id_barber: faker.datatype.number({ min: 1, max: 5 }),
    date_reservation: faker.date.future(),
    id_service: faker.datatype.number({ min: 1, max: 8 })
  });
};