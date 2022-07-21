const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const requestBodyValidation = require("../middleware/requestBodyValidation");
const accessControlValidation = require("../middleware/accessControl");

/**
 * @swagger
 * /v1/user/userProfileDetail:
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
  "/userProfileDetail",
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
 * /v1/user/deleteProfile:
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
 *    parameters:
 *      - name: oldPassword
 *        description:  Old Password.
 *        in: formData
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: admin123
 *      - name: newPassword
 *        description:  New Password.
 *        in: formData
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: admin1234
 *      - name: confirmPassword
 *        description:  Confirm Password.
 *        in: formData
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: admin1234
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
 *    parameters:
 *      - name: password
 *        description:  Enter Current Password.
 *        in: formData
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: admin1234
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
 *    parameters:
 *      - name: image
 *        description:  Upload Image.
 *        in: formData
 *        type: file
 *    responses:
 *      200:
 *        description: Success
 */

router.post(
  "/uploadProfileImage",
  accessControlValidation.grantAccess("updateOwn", "profile"),
  userController.uploadProfileImage
);

module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ2Y2MyZDdkYzYwYzcyNDc3NzgxYzkiLCJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwicm9sZU5hbWUiOiJhZG1pbiIsImlhdCI6MTY1ODQxNjc5MiwiZXhwIjoxNjU4NDQ2NzkyfQ.hm6Ml-kCBuzb0__8z_Nq5O5-pyq101n73aur7QV5ka4
