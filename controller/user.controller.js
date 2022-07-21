const UserModel = require("../models/User"),
  jwt = require("jsonwebtoken"),
  generalResponse = require("../utlls/response"),
  bcryptHelper = require("../utlls/bcrypt.helper"),
  mongoose = require("mongoose"),
  httpCodes = require("../utlls/httpCodestatus"),
  generateToken = require("../helper/generateToken"),
  _ = require("lodash"),
  generateAccess_RefreshToken = require("../helper/generateToken");

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
  // refreshToken: async (req, res) => {
  //   try {
  //     const refreshToken = req.body.token;
  //     if (refreshToken == null)
  //       return res.status(401).send({ message: "Invalid token send" });
  //     if (!refreshToken.includes(refreshToken))
  //       return res.status(403).send({ message: "Unathorized token " });
  //     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
  //       if (err) return res.status(403).send({ message: "Unathorized token " });
  //       let accessToken = jwt.sign(user, process.env.TOKEN_KEY);
  //       res.json({ accessToken: accessToken, user });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  getProfileDetails: async (req, res) => {
    try {
      let { _id } = req.user;
      let user = await UserModel.findOne({ _id }).select("-password");
      if (user)
        generalResponse.successResponse(res, httpCodes.FOUND, {
          status: true,
          user,
        });
      else
        generalResponse.successResponse(res, httpCodes.NOT_FOUND, {
          status: false,
          message: "No Profile Found",
        });
    } catch (err) {
      generalResponse.errorResponse(res, httpCodes.INTERNAL_SERVER_ERROR, {
        status: false,
        message: error.message,
      });
    }
  },
  updateProfileUser: async (req, res) => {
    try {
      let {
        first_name,
        last_name,
        email,
        address,
        addressSecondary,
        state,
        zipCode,
        city,
        gender,
        dateOfBirth,
        contactNumber,
      } = req.body;
      const { _id: userId } = req.user;
      const updataUser = await UserModel.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          first_name,
          last_name,
          email,
          address,
          addressSecondary,
          state,
          zipCode,
          city,
          gender,
          dateOfBirth,
          contactNumber,
        }
      );
      if (!updataUser)
        generalResponse.successResponse(res, httpCodes.BAD_REQUEST, {
          status: true,
          message: "No User Found",
        });
      else
        generalResponse.successResponse(res, httpCodes.BAD_REQUEST, {
          status: true,
          message: "Profile is Updated Successfully",
        });
    } catch (error) {
      generalResponse.errorResponse(res, httpCodes.INTERNAL_SERVER_ERROR, {
        status: false,
        message: error.message,
      });
    }
  },
  deleteCurrentUser: async (req, res) => {
    const { _id } = req.user;
    try {
      const userRemoved = UserModel.updateOne({ _id }, { isDeleted: true });

      if (userRemoved)
        generalResponse.successResponse(res, httpCodes.OK, {
          status: true,
          message: "User Removed Successfully",
        });
      else
        generalResponse.errorResponse(res, httpCodes.BAD_REQUEST, {
          status: true,
          message: "Unable to Remove User",
        });
    } catch (error) {
      generalResponse.errorResponse(res, httpCodes.INTERNAL_SERVER_ERROR, {
        status: false,
        message: error.message,
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const { _id } = req.user;
      const hashedPassword = await bcryptHelper.generateHashPassword(password);
      const userPasswordUpdate = await UserModel.updateOne(
        {
          _id,
        },
        {
          password: hashedPassword,
        }
      );

      if (userPasswordUpdate)
        generalResponse.successResponse(res, httpCodes.OK, {
          status: true,
          message: "Password is Updated Successfully",
        });
      else
        generalResponse.errorResponse(res, httpCodes.BAD_REQUEST, {
          status: false,
          message: "Password is not Updated",
        });
    } catch (error) {
      generalResponse.errorResponse(res, httpCodes.INTERNAL_SERVER_ERROR, {
        status: false,
        message: error.message,
      });
    }
  },
  confirmPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const { _id } = req.user;
      const userPassword = await UserModel.findOne({
        _id,
      }).select("password");

      if (userPassword?._id) {
        const match = await bcrypt.compare(password, userPassword.password);

        if (match)
          generalResponse.successResponse(res, httpCodes.OK, {
            status: true,
            message: "Password matched Successfully",
          });
        else
          generalResponse.errorResponse(res, httpCodes.BAD_REQUEST, {
            status: false,
            message: "Wrong Password",
          });
      } else
        generalResponse.errorResponse(res, httpCodes.BAD_REQUEST, {
          status: false,
          message: "No User Found",
        });
    } catch (error) {
      generalResponse.errorResponse(res, httpCodes.INTERNAL_SERVER_ERROR, {
        status: false,
        message: error.message,
      });
    }
  },

  uploadProfileImage: async (req, res) => {
    try {
      const { password, userId } = req.body;
      if (!password && !userId) {
        res
          .status(httpCodes.BAD_REQUEST)
          .send({ status: false, message: "Password or User Id is Missing" });
        res.end();
        return;
      } else {
        const userPassword = await UserModel.findOne({
          _id: userId,
        }).select("password");

        if (userPassword?._id) {
          const match = await bcrypt.compare(password, userPassword.password);

          if (match)
            generalResponse.successResponse(res, httpCodes.OK, {
              status: true,
              message: "Password matched Successfully",
            });
          else
            generalResponse.errorResponse(res, httpCodes.BAD_REQUEST, {
              status: false,
              message: "Wrong Password",
            });
        } else
          generalResponse.errorResponse(res, httpCodes.BAD_REQUEST, {
            status: false,
            message: "No User Found",
          });
      }
    } catch (error) {
      generalResponse.errorResponse(res, httpCodes.INTERNAL_SERVER_ERROR, {
        status: false,
        message: error.message,
      });
    }
  },
};
