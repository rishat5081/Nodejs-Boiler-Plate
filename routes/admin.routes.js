const router = require("express").Router();
const generalResponse = require("../utlls/response");
const httpCodes = require("../utlls/httpCodestatus");
const UserModel = require("../models/User");
const GenerateToken = require("../helper/generateToken");
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
    if (!email && !password) {
      generalResponse(res, httpCodes.BAD_REQUEST, {
        message: "Email & Password is required",
      });
    } else {
      const adminLogin = await UserModel.findOne({ email, password })
        .select("-password")
        .populate("roleId", "roleName");
      if (adminLogin?._id) {
        const token = await GenerateToken.generateAccess_RefreshToken(
          adminLogin
        );
        generalResponse(res, httpCodes.OK, {
          message: "Logged In Successfull",
          adminLogin,
          token,
        });
      } else {
        generalResponse(res, httpCodes.BAD_REQUEST, {
          message: "No User Found",
        });
      }
    }
  } catch (error) {
    generalResponse(res, httpCodes.BAD_REQUEST, {
      error,
    });
  }
});

module.exports = router;
