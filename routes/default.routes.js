const router = require("express").Router();
const authenticateController = require("../controller/authentication.controller");
const requestBodyValidation = require("../middleware/requestBodyValidation");
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
 *          example: test@gmail.com
 *      - name: password
 *        description: User's password.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: test@12345
 *      - name: first_name
 *        description: First Name of the User.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: John
 *      - name: last_name
 *        description:  Last Name of the User.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: Doe
 *      - name: address
 *        description: Address of the User.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: House 6 Street 23 DHA Phase 76 Islamabad
 *      - name: contactNumber
 *        description:  Contact Number of the User.
 *        in: formData
 *        required: true
 *        type: number
 *        schema:
 *          type: number
 *          maximum: 50
 *          example: 0900 786501
 *      - name: gender
 *        description:  Gender Can only be male, female, others.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: male, female, others
 *      - name: dateOfBirth
 *        description:  Date of Birth.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: date
 *      - name: state
 *        description:  State of your current location.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: Punjab
 *      - name: city
 *        description:  city of your current location.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: Islamabad
 *      - name: zipCode
 *        description:  Zip Code of your place.
 *        in: formData
 *        required: true
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: zip
 *    responses:
 *      200:
 *        description: Success
 */
router.post(
  "/register",
  requestBodyValidation.checkRequestBody,
  authenticateController.regiserUser
);
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
 *          example: test@12345
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
