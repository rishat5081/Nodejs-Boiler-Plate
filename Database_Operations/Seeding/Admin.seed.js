require("dotenv").config();
const RoleModel = require("../../models/Role");
const UserModel = require("../../models/User");
const adminData = require("../Raw Data/admin");
const { color, log } = require("console-log-colors");
require("../../config/Database/mongodb");
(async () => {
  const roleData = await RoleModel.findOne({ roleName: "admin" }).select("_id");

  if (roleData?._id) {
    const userArray = await adminData.adminData;
    const seeding = await UserModel.create(
      userArray.map((user) => ({ ...user, roleId: roleData?._id }))
    );
    if (seeding.length > 0) {
      log(color.green(" ******************************************** "));
      log(color.green(" *******                              ******* "));
      log(color.green(" ******* Admin  Inserted successfully ******* "));
      log(color.green(" *******                              ******* "));
      log(color.green(" ******************************************** "));
      process.exit();
    }
  } else {
    log(color.red(" ******************************************** "));
    log(color.red(" *******                              ******* "));
    log(color.red(" ******* Run `npm run role`     first ******* "));
    log(color.red(" *******                              ******* "));
    log(color.red(" ******************************************** "));
    process.exit();
  }
})();
