const { faker } = require("@faker-js/faker");
const hashingPassword = require("../../utlls/bcrypt.helper");

const createUserData = async () => {
  let userData = [];
  for (let index = 0; index < 10; index++) {
    userData.push({
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
      avatar: "public/userprofileImage/API1658476924535.jpeg",
    });
  }
  return userData;
};
module.exports = {
  userData: createUserData(),
};
