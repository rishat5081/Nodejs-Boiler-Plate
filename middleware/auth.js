const jwt = require("jsonwebtoken");
const generalResponse = require("../utlls/response");
const httpCodes = require("../utlls/httpCodestatus");

module.exports = (req, res, next) => {
  const authorizationHeaders =
    req.headers["authorization"] || req.headers["Authorization"];
  const jwtToken = authorizationHeaders
    ? `${authorizationHeaders}`.split("Bearer ")[1]
    : "";
  if (!jwtToken)
    generalResponse.errorResponse(res, httpCodes.BAD_REQUEST, {
      status: false,
      message: "No Access Token Provided",
    });

  jwt.verify(jwtToken, process.env.TOKEN_KEY, (err, decoded) => {
    if (err)
      generalResponse.errorResponse(res, httpCodes.BAD_REQUEST, {
        status: false,
        message: "Invalid Token Send",
      });
    else {
      console.log("JWT", decoded);
      req.userId = decoded._id;
      next();
    }
  });
};
