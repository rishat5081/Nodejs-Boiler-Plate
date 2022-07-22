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
      const {
        first_name,
        last_name,
        email,
        password,
        address,
        addressSecondary,
        state,
        zipCode,
        city,
        gender,
        dateOfBirth,
        contactNumber,
      } = req.body;

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

        //getting the location from the IP address
        const location = await fetchLocation.fetchLocationUsingIP(req.ip);
        //registering a new user
        const newUser = await UserModel.create({
          first_name,
          last_name,
          email,
          password: encryptedPassword,
          address,
          addressSecondary,
          state,
          zipCode,
          city,
          gender,
          dateOfBirth,
          contactNumber,
          roleId: roleId?._id,
          geoLocation: {
            longitude: location?.longitude,
            latitude: location?.latitude,
          },
        });

        if (newUser?._id)
          generalResponse.errorResponse(res, httpCodestatus.CONFLICT, {
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
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email }).populate(
        "roleId",
        "roleName"
      );

      if (!user) {
        generalResponse.errorResponse(
          res,
          httpCodestatus.INTERNAL_SERVER_ERROR,
          {
            status: false,
            message: "User does not exist",
          }
        );
      } else {
        if (
          !(await bcryptHelper.compareHashPassword(password, user.password))
        ) {
          generalResponse.errorResponse(res, httpCodestatus.BAD_REQUEST, {
            message: "Invalid Password",
          });
        } else {
          let accessToken = await generateToken.generateAccess_RefreshToken(
            user
          );
          var clone = Object.assign({}, user);
          delete clone._doc.password;
          generalResponse.successResponse(res, httpCodestatus.OK, {
            status: true,
            message: "Logged In Successfully",
            ...accessToken,
            user: clone._doc,
          });
        }
      }
    } catch (err) {
      console.log("--", err);
      generalResponse.errorResponse(res, httpCodestatus.INTERNAL_SERVER_ERROR, {
        message: "Error Login In User",
        serverError: err,
      });
    }
  },
};
