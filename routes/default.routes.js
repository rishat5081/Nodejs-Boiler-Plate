const router = require("express").Router();
const authenticateController = require("../controller/authentication.controller");
const verifyToken = require("../middleware/auth");
const requestBodyValidation = require("../middleware/requestBodyValidation");
const accessControlValidation = require("../middleware/accessControl");
const generalResponse = require("../utlls/response");
const httpCodes = require("../utlls/httpCodestatus");

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
 *    parameters:
 *      - name: email
 *        description: Email to use for login.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *        examples:
 *          email:
 *            value: test@gmail.com
 *      - name: password
 *        description: User's password.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *        examples:
 *          password:
 *            value:test@12345
 *      - name: first_name
 *        description: First Name of the User.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *        examples:
 *          first_name:
 *            value:John
 *      - name: last_name
 *        description:  Last Name of the User.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *        examples:
 *          last_name:
 *            value:Doe
 *      - name: address
 *        description: Address of the User.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *        examples:
 *          address:
 *            value:House 6 Street 23 DHA Phase 76 Islamabad
 *      - name: contactNumber
 *        description:  Contact Number of the User.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *        examples:
 *          contactNumber:
 *            value:0900 786501
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
 *    parameters:
 *      - name: email
 *        description: Email to use for login.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: test@gmail.com
 *      - name: password
 *        description: User's password.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: test@123
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
