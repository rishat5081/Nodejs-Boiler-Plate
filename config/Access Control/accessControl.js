const AccessControl = require("accesscontrol");
const ac = new AccessControl();
const Stakeholders = require("../Role/role");

exports.roles = (function () {
  /**
   *
   * Granting the access to the user
   */
  ac.grant(Stakeholders.user)
    .createOwn("profile")
    .readOwn("profile")
    .updateOwn("profile")
    .deleteOwn("profile");
  /**
   *
   * Granting the access to the admin
   */
  ac.grant(Stakeholders.admin)
    .extend(Stakeholders.user)
    .updateAny("profile")
    .deleteAny("profile");
  return ac;
})();
