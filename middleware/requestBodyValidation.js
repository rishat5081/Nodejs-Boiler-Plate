const generalResponse = require("../utlls/response");
const httpCodes = require("../utlls/httpCodestatus");

module.exports = {
  checkRequestBody: (req, res, next) => {
    if (Object.keys(req.body).length === 0)
      generalResponse.errorResponse(res, httpCodes.BAD_REQUEST, {
        status: false,
        message: "Request Body Can not be Empty",
      });
    else next();
  },
};
