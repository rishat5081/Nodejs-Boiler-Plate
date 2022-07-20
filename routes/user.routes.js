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
  userController.currentuser
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
  userController.deletUserById
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
  userController.deletUserById
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
