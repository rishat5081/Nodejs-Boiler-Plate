const RoleModel = require("../../models/Role");
const UserModel = require("../../models/User");
const userData = require("../Raw Data/user");
const { color, log } = require("console-log-colors");

console.log("userData", userData.userData);

(async () => {
  //   const seeding = await RoleModel.create(roleData.rolesData);
  //   if (seeding.length > 0) {
  //     log(color.cyan(" ******************************************** "));
  //     log(color.cyan(" *******                              ******* "));
  //     log(color.cyan(" ******* Roles Inserted  successfully ******* "));
  //     log(color.cyan(" *******                              ******* "));
  //     log(color.cyan(" ******************************************** "));
  //     process.exit();
  //   }
})();
