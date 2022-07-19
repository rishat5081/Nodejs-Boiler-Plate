const jwt = require("jsonwebtoken");
module.exports = {
  generateAccess_RefreshToken: (user) => {
    return new Promise((resolve, reject) => {
      var token = {};
      token.accessToken = jwt.sign(
        {
          _id: user?._id,
          first_name: user?.first_name,
          last_name: user?.last_name,
          email: user?.email,
          roleId: user?.roleId,
          roleName: user?.roleId?.roleName,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5m",
        }
      );
      token.refreshToken = jwt.sign(
        {
          _id: user?._id,
          first_name: user?.first_name,
          last_name: user?.last_name,
          email: user?.email,
          roleId: user?.roleId,
          roleName: user?.roleId?.roleName,
        },
        process.env.REFRESH_TOKEN_KEY,
        {
          expiresIn: "6h",
        }
      );
      if (Object.keys(token).length > 0) resolve({ status: true, ...token });
      else reject({ status: false, message: "Error creating the Tokens" });
    });
  },
};
