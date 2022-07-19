// Add this to the top of the file
const { roles } = require("../config/Access Control/accessControl");
const generalResponse = require("../utlls/response");
const httpCodes = require("../utlls/httpCodestatus");

module.exports = {
  grantAccess: (action, resource) => {
    return async (req, res, next) => {
      try {
        const permission = await roles
          .can(req?.user?.roleName)
          [action](resource);

        if (!permission.granted)
          generalResponse.errorResponse(res, httpCodes.UNAUTHORIZED, {
            error: "You don't have enough permission to perform this action",
          });
        next();
      } catch (error) {
        generalResponse.errorResponse(res, httpCodes.INTERNAL_SERVER_ERROR, {
          error: "Error in Checking the Permissions",
        });
      }
    };
  },
  allowIfLoggedin: async (req, res, next) => {
    try {
      const user = req?.user;
      if (!user)
        generalResponse.errorResponse(res, httpCodes.UNAUTHORIZED, {
          error: "You need to be logged in to access this route",
        });
      next();
    } catch (error) {
      generalResponse.errorResponse(res, httpCodes.INTERNAL_SERVER_ERROR, {
        error: "Error in Checking the Permissions Logged In User Status",
      });
    }
  },
};
