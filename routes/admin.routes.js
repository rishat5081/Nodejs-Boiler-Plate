const router = require("express").Router();
const generalResponse = require("../utlls/response");
const httpCodestatus = require("../utlls/httpCodestatus");
const UserModel = require("../models/User");
const bcryptHelper = require("../utlls/bcrypt.helper"),
  generateToken = require("../helper/generateToken");
/**
 *
 *
 */
router.get("/", (req, res) => {
  res.render("login");
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

module.exports = router;
