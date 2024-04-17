const faker = require('faker');

module.exports = (factory, Models) => {
  factory.define('Barber', Models.Barber, {
    name: faker.name.findName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    admin: false,
    available: true
  });
};