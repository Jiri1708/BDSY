"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/identity-error.js");

const WARNINGS = {
  assignRoleUnsupportedKeys: {
    code: `${Errors.AssignRole.UC_CODE}unsupportedKeys`
  },
  removeRoleUnsupportedKeys: {
    code: `${Errors.RemoveRole.UC_CODE}unsupportedKeys`
  },
  getRolesUnsupportedKeys: {
    code: `${Errors.GetRoles.UC_CODE}unsupportedKeys`
  }
};

class IdentityAbl {

  constructor() {
    this.validator = Validator.load();
    // this.dao = DaoFactory.getDao("identity");
  }

  async getRoles(awid, dtoIn) {
     // HDS 1.1
     let validationResult = this.validator.validate("identityGetRolesDtoInType", dtoIn);

     // HDS 1.2, 1.3 // A1, A2
     let uuAppErrorMap = ValidationHelper.processValidationResult(
       dtoIn,
       validationResult,
       WARNINGS.getRolesUnsupportedKeys.code,
       Errors.GetRoles.InvalidDtoIn
     );
 
     // HDS 2
     let dtoOut = { ...dtoIn };
     dtoOut.awid = awid;
     dtoOut.uuAppErrorMap = uuAppErrorMap;
     return dtoOut;
  }

  async removeRole(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("identityRemoveRoleDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.removeRoleUnsupportedKeys.code,
      Errors.RemoveRole.InvalidDtoIn
    );

    // HDS 2
    let dtoOut = { ...dtoIn };
    dtoOut.awid = awid;
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async assignRole(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("identityAssignRoleDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.assignRoleUnsupportedKeys.code,
      Errors.AssignRole.InvalidDtoIn
    );

    // HDS 2
    let dtoOut = { ...dtoIn };
    dtoOut.awid = awid;
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

}

module.exports = new IdentityAbl();
