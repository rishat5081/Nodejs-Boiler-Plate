const router = require("express").Router();
const generalResponse = require("../utlls/response");
const httpCodes = require("../utlls/httpCodestatus");
const UserModel = require("../models/User");
router.get("/", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      generalResponse(res, httpCodes.BAD_REQUEST, {
        message: "Email & Password is required",
      });
    } else {
      const adminLogin = await UserModel.findOne({ email, password }).select(
        "-password"
      );
      if (adminLogin?._id) {
        generalResponse(res, httpCodes.OK, {
          message: "Logged In Successfull",
          adminLogin,
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
