"use strict";

const HomeworkMainUseCaseError = require("./homework-main-use-case-error.js");
const IDENTITY_ERROR_PREFIX = `${HomeworkMainUseCaseError.ERROR_PREFIX}identity/`;

const AssignRole = {
  UC_CODE: `${IDENTITY_ERROR_PREFIX}assignRole/`,
  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AssignRole.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const RemoveRole = {
  UC_CODE: `${IDENTITY_ERROR_PREFIX}removeRole/`,
  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveRole.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const GetRoles = {
  UC_CODE: `${IDENTITY_ERROR_PREFIX}getRoles/`,
  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetRoles.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

module.exports = {
  GetRoles,
  RemoveRole,
  AssignRole
};
