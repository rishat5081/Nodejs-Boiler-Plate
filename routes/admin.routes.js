const router = require("express").Router();
const generalResponse = require("../utlls/response");
const httpCodestatus = require("../utlls/httpCodestatus");
const UserModel = require("../models/User");
const bcryptHelper = require("../utlls/bcrypt.helper"),
  generateToken = require("../helper/generateToken");
const accessControlValidation = require("../middleware/accessControl");
const verifyToken = require("../middleware/auth");

/**
 *
 *
 */
router.get("/", (req, res) => {
  res.render("login");
});

router.get("/getAllUser", (req, res) => {
  res.render("getAllUsers");
});

/***
 *
 *
 *
 *
 * Admin Login
 */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).populate(
      "roleId",
      "roleName"
    );
    if (!user) {
      generalResponse.errorResponse(res, httpCodestatus.INTERNAL_SERVER_ERROR, {
        status: false,
        message: "User does not exist",
      });
    } else if (!user?.roleId?.roleName.toString() === "admin") {
      generalResponse.errorResponse(res, httpCodestatus.BAD_REQUEST, {
        message: "User is not an Admin",
      });
    } else {
      if (!(await bcryptHelper.compareHashPassword(password, user.password))) {
        generalResponse.errorResponse(res, httpCodestatus.BAD_REQUEST, {
          message: "Invalid Password",
        });
      } else {
        let accessToken = await generateToken.generateAccess_RefreshToken(user);
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
});

router.get(
  "/getAllUserDetails",
  verifyToken,
  accessControlValidation.allowIfLoggedin,
  accessControlValidation.grantAccess("readAny", "profile"),
  async (req, res) => {
    try {
      const usersDetails = await UserModel.find().select(
        "-password -geoLocation -__v -_id -isNewProfile -isDeleted -roleId"
      );
      if (usersDetails.length === 0)
        generalResponse.errorResponse(
          res,
          httpCodestatus.INTERNAL_SERVER_ERROR,
          {
            status: false,
            message: "No User Found",
          }
        );
      else
        generalResponse.successResponse(res, httpCodestatus.OK, {
          status: true,
          message: "Fetched the User Details Successfully",
          usersDetails,
        });
    } catch (err) {
      generalResponse.errorResponse(res, httpCodestatus.INTERNAL_SERVER_ERROR, {
        message: "Error Fetching the User",
        serverError: err,
      });
    }
  }
);

module.exports = router;
