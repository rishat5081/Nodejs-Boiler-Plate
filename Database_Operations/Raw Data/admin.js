const { faker } = require("@faker-js/faker");
const hashingPassword = require("../../utlls/bcrypt.helper");

const createAdminData = async () => {
  let adminData = [];
  for (let index = 0; index < 2; index++) {
    adminData.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: await hashingPassword.generateHashPassword("admin123"),
      avatar: faker.internet.avatar(),
      address: faker.address.streetAddress(),
      address_2: faker.address.secondaryAddress(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      city: faker.address.city(),
      geoLocation: {
        longitude: -180 + Math.random() * 360,
        latitude: -89.99 + Math.random() * 180,
      },
    });
  }
  return adminData;
};
module.exports = {
  adminData: createAdminData(),
};
