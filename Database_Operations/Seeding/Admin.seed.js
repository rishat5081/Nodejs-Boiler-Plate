const RoleModel = require("../../models/Role");
const UserModel = require("../../models/User");
const adminData = require("../Raw Data/user");
const { color, log } = require("console-log-colors");

(async () => {
  const roleData = await RoleModel.findOne({ roleName: "admin" }).select("_id");
  const userArray = await adminData.adminData;
  const seeding = await UserModel.create(
    userArray.map((user) => ({ ...user, roleId: roleData?._id }))
  );
  if (seeding.length > 0) {
    log(color.cyan(" ******************************************** "));
    log(color.cyan(" *******                              ******* "));
    log(color.cyan(" ******* Admin  Inserted successfully ******* "));
    log(color.cyan(" *******                              ******* "));
    log(color.cyan(" ******************************************** "));
    process.exit();
  }
})();
