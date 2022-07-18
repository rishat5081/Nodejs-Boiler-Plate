const router = require("express").Router();
const User = require("./user.routes");
const GeneralRoutes = require("./default.routes");

/***
 *
 * Setting the routes
 */
router.use("/", GeneralRoutes);

router.use("/user", User);

module.exports = router;
