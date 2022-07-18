const RoleModel = require("../../models/Role");
const roleData = require("../Raw Data/roles");
const { color, log } = require("console-log-colors");

(async () => {
  const seeding = await RoleModel.create(roleData.rolesData);

  if (seeding.length > 0) {
    log(color.cyan(" ******************************************** "));
    log(color.cyan(" *******                              ******* "));
    log(color.cyan(" ******* Roles Inserted  successfully ******* "));
    log(color.cyan(" *******                              ******* "));
    log(color.cyan(" ******************************************** "));
    process.exit();
  }
})();
