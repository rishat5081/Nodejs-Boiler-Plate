const bcrypt = require("bcryptjs");
module.exports = {
  generateHashPassword: async (password) => {
    return await bcrypt.hashSync(password, process.env.SALT);
  },
  compareHashPassword: async (password, hashPassword) => {
    return await bcrypt.compareSync(password, hashPassword);
  },
};
