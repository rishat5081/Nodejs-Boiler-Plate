const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const verifyToken = require("../middleware/auth");
const requestBodyValidation = require("../middleware/requestBodyValidation");
const accessControlValidation = require("../middleware/accessControl");

/**
 * @swagger
 * /v1/user/register:
 *  post:
 *    tags:
 *      - User
 *    description: Register User Route
 *    responses:
 *      200:
 *        description: Success
 */
router.post("/register", userController.regiserUser);
/**
 * @swagger
 * /v1/user/login:
 *  post:
 *    tags:
 *      - User
 *    description: Login User Route
 *    responses:
 *      200:
 *        description: Success
 */
router.post(
  "/login",
  requestBodyValidation.checkRequestBody,
  userController.UserLogin
);
/**
 * @swagger
 * /v1/user/userdetail:
 *  get:
 *    tags:
 *      - User
 *    description: Get User Details Route
 *    responses:
 *      200:
 *        description: Success
 */

router.get(
  "/userdetail",
  verifyToken,
  accessControlValidation.allowIfLoggedin,
  accessControlValidation.grantAccess("readOwn", "profile"),
  userController.currentuser
);
/**
 * @swagger
 * /v1/user/refrestoken:
 *  post:
 *    tags:
 *      - User
 *    description: Refresh Token Route
 *    responses:
 *      200:
 *        description: Success
 */
router.post(
  "/refrestoken",
  requestBodyValidation.checkRequestBody,
  userController.refreshToken
);

/**
 * @swagger
 * /v1/user/updateUserProfile:
 *  put:
 *    tags:
 *      - User
 *    description: Refresh Token Route
 *    responses:
 *      200:
 *        description: Success
 */

router.put(
  "/updateUserProfile",
  requestBodyValidation.checkRequestBody,
  userController.updateProfileUser
);

/**
 * @swagger
 * /v1/user/deletUser:
 *  delete:
 *    tags:
 *      - User
 *    description: Delete User Route
 *    responses:
 *      200:
 *        description: Success
 */

router.delete("/deletuser/:id", userController.deletUserById);
/**
 * @swagger
 * /v1/user/resetPassword:
 *  put:
 *    tags:
 *      - User
 *    description: Reset Password Route
 *    responses:
 *      200:
 *        description: Success
 */

router.put(
  "/resetPassword",
  requestBodyValidation.checkRequestBody,
  userController.deletUserById
);

/**
 * @swagger
 * /v1/user/uploadProfileImage:
 *  post:
 *    tags:
 *      - User
 *    description: Reset Password Route
 *    responses:
 *      200:
 *        description: Success
 */

router.post(
  "/uploadProfileImage",
  requestBodyValidation.checkRequestBody,
  userController.uploadProfileImage
);

module.exports = router;
