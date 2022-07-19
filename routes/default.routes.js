const router = require("express").Router();
const authenticateController = require("../controller/authentication.controller");
const verifyToken = require("../middleware/auth");
const requestBodyValidation = require("../middleware/requestBodyValidation");
const accessControlValidation = require("../middleware/accessControl");
/**
 * @swagger
 * /v1/:
 *  get:
 *    tags:
 *      - Home
 *    description: Default Route
 *    responses:
 *      200:
 *        description: Success
 */
router.get("/", (req, res) => {
  generalResponse.successResponse(res, httpCodes.OK, {
    status: true,
    message: "Welcome to Now we Play",
  });
});

/**
 * @swagger
 * /v1/register:
 *  post:
 *    tags:
 *      - Authenitcation
 *    description: Register User Route
 *    responses:
 *      200:
 *        description: Success
 */
router.post("/register", authenticateController.regiserUser);
/**
 * @swagger
 * /v1/login:
 *  post:
 *    tags:
 *      - Authenitcation
 *    description: Login User Route
 *    responses:
 *      200:
 *        description: Success
 */
router.post(
  "/login",
  requestBodyValidation.checkRequestBody,
  authenticateController.UserLogin
);

module.exports = router;
