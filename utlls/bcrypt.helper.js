const bcrypt = require("bcryptjs");
module.exports = {
  generateHashPassword: async (password) => {
    return bcrypt.hashSync(password, +process.env.SALT);
  },
  compareHashPassword: async (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
  },
};
