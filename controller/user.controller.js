const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const generalResponse = require("../utlls/response");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const httpCodes = require("../utlls/httpCodestatus");
let refreshTokens = [];
const generateAccess_RefreshToken = require("../helper/generateToken");

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
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        res.status(400).send({ message: "user can't exist" });
      }
      if (user && (await bcrypt.compare(password, user.password))) {
        let accessToken = jwt.sign(user.toJSON(), process.env.TOKEN_KEY, {
          expiresIn: "15m",
        });
        const refreshToken = jwt.sign(
          user.toJSON(),
          process.env.REFRESH_TOKEN_KEY,
          {
            expiresIn: "15m",
          }
        );
        refreshTokens.push(refreshToken);
        return res.status(201).json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          user,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.body.token;
      if (refreshToken == null)
        return res.status(401).send({ message: "Invalid token send" });
      if (!refreshToken.includes(refreshToken))
        return res.status(403).send({ message: "Unathorized token " });
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
        if (err) return res.status(403).send({ message: "Unathorized token " });
        let accessToken = jwt.sign(user, process.env.TOKEN_KEY);
        res.json({ accessToken: accessToken, user });
      });
    } catch (err) {
      console.log(err);
    }
  },
  currentuser: async (req, res) => {
    try {
      let _id = req._id;

      let user = await UserModel.findOne({ _id: _id });
      if (user) {
        return res.status(201).json({
          user,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  updateProfileUser: async (req, res) => {
    try {
      let { password } = req.body;
      encryptedPassword = await bcrypt.hash(password, 10);

      const updataUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          richDescription: req.body.richDescription,
          email: req.body.email,
          address: req.body.address,
          contactNumber: req.body.contactNumber,
          password: encryptedPassword,
        },
        {
          new: true,
        }
      );
      if (!updataUser) {
        res.status(400).send({ message: "Invalid user Id" });
      }
      res.status(200).send(updataUser);
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, error: error });
    }
  },
  deletUserById: async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).send({ error: "invalid user Id" });
    }

    const userdelet = UserModel.findByIdAndRemove(req.params.id)
      .then((user) => {
        if (user) {
          return res
            .status(200)
            .json({ success: true, message: "the user is remove" });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "the id can't match" });
        }
      })
      .catch((err) => {
        return res.status(500).json({ success: false, error: err });
      });
  },
  resetPassword: async (req, res) => {
    try {
      const { password, userId } = req.body;
      if (!password && !userId) {
        res
          .status(httpCodes.BAD_REQUEST)
          .send({ status: false, message: "Password or User Id is Missing" });
        res.end();
        return;
      } else {
        const hashedPassword = await bcrypt.hash(password, process.env.SALT);
        const userPasswordUpdate = await UserModel.updateOne(
          {
            _id: userId,
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
      }
    } catch (error) {
      generalResponse.errorResponse(res, httpCodes.INTERNAL_SERVER_ERROR, {
        status: false,
        message: error.message,
      });
    }
  },
  confirmPassword: async (req, res) => {
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