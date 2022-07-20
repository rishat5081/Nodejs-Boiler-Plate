const router = require("express").Router();
const User = require("./user.routes");
const GeneralRoutes = require("./default.routes");

const verifyToken = require("../middleware/auth");
const requestBodyValidation = require("../middleware/requestBodyValidation");
const accessControlValidation = require("../middleware/accessControl");

/***
 *
 * Setting the routes
 */
router.use("/", GeneralRoutes);

router.use("/user", verifyToken, accessControlValidation.allowIfLoggedin, User);

module.exports = router;
