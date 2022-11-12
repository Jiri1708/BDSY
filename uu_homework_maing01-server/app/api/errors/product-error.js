"use strict";

const HomeworkMainUseCaseError = require("./homework-main-use-case-error.js");
const PRODUCT_ERROR_PREFIX = `${HomeworkMainUseCaseError.ERROR_PREFIX}product/`;

const Create = {
  UC_CODE: `${PRODUCT_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const Get = {
  UC_CODE: `${PRODUCT_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const Update = {
  UC_CODE: `${PRODUCT_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

module.exports = {
  Update,
  Get,
  Create
};
