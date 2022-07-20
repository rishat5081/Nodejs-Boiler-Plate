const UserModel = require("../models/User"),
  RoleModel = require("../models/Role"),
  generalResponse = require("../utlls/response"),
  bcryptHelper = require("../utlls/bcrypt.helper"),
  httpCodestatus = require("../utlls/httpCodestatus"),
  rolesInApplication = require("../config/Role/role"),
  generateToken = require("../helper/generateToken"),
  fetchLocation = require("../utlls/fetchLocation.helper");

module.exports = {
  regiserUser: async (req, res) => {
    try {
      const { first_name, last_name, email, password, ...rest } = req.body;

      //checking if the user already registered or not
      const oldUser = await UserModel.findOne({ email });

      if (oldUser)
        generalResponse.errorResponse(res, httpCodestatus.CONFLICT, {
          message: "User Already Exist. Please Provide another email",
        });
      else {
        const encryptedPassword = await bcryptHelper.generateHashPassword(
          password
        );

        const roleId = await RoleModel.findOne({
          roleName: rolesInApplication.user,
        }).select("_id");

        //getting the location
        const location = await fetchLocation.fetchLocationUsingIP(req.ip);
        //creating the new user model
        const newUser = await UserModel.create({
          first_name,
          last_name,
          email,
          password: encryptedPassword,
          roleId: roleId?._id,
          geoLocation: {
            longitude: location?.longitude,
            latitude: location?.latitude,
          },
          ...rest,
        });

        if (newUser?._id)
          generalResponse.errorResponse(res, httpCodestatus.OK, {
            message: "User Register Successfully",
          });
        else
          generalResponse.errorResponse(res, httpCodestatus.PARTIAL_CONTENT, {
            message: "Error Registering User",
          });
      }
    } catch (err) {
      console.log("err", err);
      generalResponse.errorResponse(res, httpCodestatus.INTERNAL_SERVER_ERROR, {
        message: "Error Registering User",
        serverError: err,
      });
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
