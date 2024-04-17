const faker = require('faker');

module.exports = (factory, Models) => {
    factory.define('Users', Models.Users, {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        telephone: faker.phone.phoneNumber()
    });
};