const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const verifyToken = require("../middleware/auth");
const requestBodyValidation = require("../middleware/requestBodyValidation");
const accessControlValidation = require("../middleware/accessControl");

/**
 * @swagger
 * /v1/user/userdetail:
 *  get:
 *    tags:
 *      - User
 *    security:
 *      - auth: []
 *    description: Get User Details Route
 *    responses:
 *      200:
 *        description: Success
 */

router.get(
  "/userdetail",
  accessControlValidation.grantAccess("readOwn", "profile"),
  userController.getProfileDetails
);
// /**
//  * @swagger
//  * /v1/user/refrestoken:
//  *  post:
//  *    tags:
//  *      - User
//  *    description: Refresh Token Route
//  *    responses:
//  *      200:
//  *        description: Success
//  */
// router.post(
//   "/refrestoken",
//   requestBodyValidation.checkRequestBody,
//   userController.refreshToken
// );

/**
 * @swagger
 * /v1/user/updateUserProfile:
 *  put:
 *    tags:
 *      - User
 *    security:
 *      - auth: []
 *    description: Refresh Token Route
 *    parameters:
 *      - name: email
 *        description: Email to use for login.
 *        in: formData
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: test@gmail.com
 *      - name: password
 *        description: User's password.
 *        in: formData
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: test@12345
 *      - name: first_name
 *        description: First Name of the User.
 *        in: formData
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: John
 *      - name: last_name
 *        description:  Last Name of the User.
 *        in: formData
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: Doe
 *      - name: address
 *        description: Address of the User.
 *        in: formData
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: House 6 Street 23 DHA Phase 76 Islamabad
 *      - name: contactNumber
 *        description:  Contact Number of the User.
 *        in: formData
 *        type: number
 *        schema:
 *          type: number
 *          maximum: 50
 *          example: 6501
 *      - name: gender
 *        description:  Gender Can only be male, female, others.
 *        in: formData
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: male, female, others
 *      - name: dateOfBirth
 *        description:  Date of Birth.
 *        in: formData
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: date
 *      - name: state
 *        description:  State of your current location.
 *        in: formData
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: Punjab
 *      - name: city
 *        description:  city of your current location.
 *        in: formData
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: Islamabad
 *      - name: zipCode
 *        description:  Zip Code of your place.
 *        in: formData
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: zip
 *    responses:
 *      200:
 *        description: Success
 */

router.put(
  "/updateUserProfile",
  accessControlValidation.grantAccess("updateOwn", "profile"),
  requestBodyValidation.checkRequestBody,
  userController.updateProfileUser
);

/**
 * @swagger
 * /v1/user/deletUser:
 *  delete:
 *    tags:
 *      - User
 *    security:
 *      - auth: []
 *    description: Delete User Route
 *    responses:
 *      200:
 *        description: Success
 */

router.delete(
  "/deleteProfile",
  accessControlValidation.grantAccess("deleteOwn", "profile"),
  userController.deleteCurrentUser
);
/**
 * @swagger
 * /v1/user/resetPassword:
 *  put:
 *    tags:
 *      - User
 *    security:
 *      - auth: []
 *    description: Reset Password Route
 *    responses:
 *      200:
 *        description: Success
 */

router.put(
  "/resetPassword",
  accessControlValidation.grantAccess("updateOwn", "profile"),
  requestBodyValidation.checkRequestBody,
  userController.resetPassword
);

/**
 * @swagger
 * /v1/user/confirmPassword:
 *  put:
 *    tags:
 *      - User
 *    security:
 *      - auth: []
 *    description: confirm Password Route
 *    responses:
 *      200:
 *        description: Success
 */

router.put(
  "/confirmPassword",
  accessControlValidation.grantAccess("updateOwn", "profile"),
  requestBodyValidation.checkRequestBody,
  userController.confirmPassword
);

/**
 * @swagger
 * /v1/user/uploadProfileImage:
 *  post:
 *    tags:
 *      - User
 *    security:
 *      - auth: []
 *    description: Reset Password Route
 *    responses:
 *      200:
 *        description: Success
 */

router.post(
  "/uploadProfileImage",
  accessControlValidation.grantAccess("updateOwn", "profile"),
  requestBodyValidation.checkRequestBody,
  userController.uploadProfileImage
);

module.exports = router;
