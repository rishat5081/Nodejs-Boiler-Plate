const jwt = require("jsonwebtoken");

module.exports = {
  generateAccess_RefreshToken: (user) => {
    return new Promise((resolve, reject) => {
      var token = {};
      token.accessToken = jwt.sign(user, process.env.TOKEN_KEY, {
        expiresIn: "5m",
      });
      refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: "6h",
      });
      if (refreshToken) resolve({ status: true, token });
      else reject({ status: false, message: "Error creating the Tokens" });
    });
  },
};
