require("dotenv").config();
const RoleModel = require("../../models/Role");
const roleData = require("../Raw Data/roles");
const { color, log } = require("console-log-colors");
require("../../config/Database/mongodb");
(async () => {
  const seeding = await RoleModel.create(roleData.rolesData);

  if (seeding.length > 0) {
    log(color.green(" ******************************************** "));
    log(color.green(" *******                              ******* "));
    log(color.green(" ******* Roles Inserted  successfully ******* "));
    log(color.green(" *******                              ******* "));
    log(color.green(" ******************************************** "));
    process.exit();
  }
})();
