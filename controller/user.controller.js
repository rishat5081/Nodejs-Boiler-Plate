const UserModel = require("../models/User"),
  generalResponse = require("../utlls/response"),
  bcryptHelper = require("../utlls/bcrypt.helper"),
  { uploadImage } = require("../config/Multer/multer"),
  httpCodes = require("../utlls/httpCodestatus");

module.exports = {
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
      const { _id } = req.user;
      const updataUser = await UserModel.findOneAndUpdate(
        {
          _id,
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

      console.log("updataUser", updataUser);
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
      const { newPassword, confirmPassword } = req.body;
      if (newPassword !== confirmPassword)
        generalResponse.successResponse(res, httpCodes.BAD_REQUEST, {
          status: true,
          message: "Password & Confirm Password should be equal",
        });
      else {
        const { _id } = req.user;
        const hashedPassword = await bcryptHelper.generateHashPassword(
          newPassword
        );
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
      const { password } = req.body;
      const { _id } = req.user;
      const userPassword = await UserModel.findOne({
        _id,
      }).select("password");

      if (userPassword?._id) {
        const match = await bcryptHelper.compareHashPassword(
          password,
          userPassword.password
        );

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
      console.log(" ----------", req.files);

      generalResponse.successResponse(res, httpCodes.OK, {
        status: true,
        message: "File Uploaded",
      });

      // const { password, userId } = req.body;
      // if (!password && !userId) {
      //   res
      //     .status(httpCodes.BAD_REQUEST)
      //     .send({ status: false, message: "Password or User Id is Missing" });
      //   res.end();
      //   return;
      // } else {
      //   const userPassword = await UserModel.findOne({
      //     _id: userId,
      //   }).select("password");

      //   if (userPassword?._id) {
      //     const match = await bcrypt.compare(password, userPassword.password);

      //     if (match)
      //       generalResponse.successResponse(res, httpCodes.OK, {
      //         status: true,
      //         message: "Password matched Successfully",
      //       });
      //     else
      //       generalResponse.errorResponse(res, httpCodes.BAD_REQUEST, {
      //         status: false,
      //         message: "Wrong Password",
      //       });
      //   } else
      //     generalResponse.errorResponse(res, httpCodes.BAD_REQUEST, {
      //       status: false,
      //       message: "No User Found",
      //     });
      // }
    } catch (error) {
      generalResponse.errorResponse(res, httpCodes.INTERNAL_SERVER_ERROR, {
        status: false,
        message: error.message,
      });
    }
  },
};
