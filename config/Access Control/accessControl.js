const AccessControl = require("accesscontrol");
const ac = new AccessControl();
const Stakeholders = require("../Role/role");

exports.roles = (function () {
  ac.grant(Stakeholders.user).readOwn("profile").updateOwn("profile");
  ac.grant(Stakeholders.admin)
    .extend(Stakeholders.user)
    .updateAny("profile")
    .deleteAny("profile");
  return ac;
})();
