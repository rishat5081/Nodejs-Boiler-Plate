const router = require("express").Router();
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

module.exports = router;
