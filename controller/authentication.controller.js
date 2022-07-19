const UserModel = require("../models/User"),
  generalResponse = require("../utlls/response"),
  bcryptHelper = require("../utlls/bcrypt.helper"),
  httpCodestatus = require("../utlls/httpCodestatus"),
  generateToken = require("../helper/generateToken");

module.exports = {
  regiserUser: async (req, res) => {
    try {
      const { first_name, last_name, email, password, address, contactNumber } =
        req.body;
      if (
        !(
          email &&
          password &&
          first_name &&
          last_name &&
          address &&
          contactNumber
        )
      ) {
        res.status(400).send({ messge: "some field is missing" });
      }
      const oldUser = await UserModel.findOne({ email });

      if (oldUser) {
        return res.status(httpCodestatus.Unauthorized).send({
          message: "User Already Exist. Please Provide another email",
        });
      } else {
        encryptedPassword = await bcrypt.hash(password, 10);
        if (
          email &&
          password &&
          first_name &&
          last_name &&
          address &&
          contactNumber
        ) {
          const user = await UserModel.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: encryptedPassword,
            address: req.body.address,
            contactNumber: req.body.contactNumber,
          });

          res.status(201).send({ user, message: "user Rigster Successfully" });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  UserLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      const user = await UserModel.findOne({ email }).populate(
        "roleId",
        "roleName"
      );
      if (!user) res.status(400).send({ message: "user can't exist" });

      if (
        Object.keys(user).length > 0 &&
        (await bcryptHelper.compareHashPassword(password, user.password))
      ) {
        let accessToken = await generateToken.generateAccess_RefreshToken(user);
        var clone = Object.assign({}, user);
        delete clone._doc.password;
        return res.status(200).json({
          ...accessToken,
          user: clone._doc,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
