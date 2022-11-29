"use strict";
const IdentityAbl = require("../../abl/identity-abl.js");
//nepouzito
class IdentityController {

  getRoles(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return IdentityAbl.getRoles(awid, dtoIn);
  }

  removeRole(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return IdentityAbl.removeRole(awid, dtoIn);
  }

  assignRole(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return IdentityAbl.assignRole(awid, dtoIn);
  }

}

module.exports = new IdentityController();
