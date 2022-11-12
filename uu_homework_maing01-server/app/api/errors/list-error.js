"use strict";

const HomeworkMainUseCaseError = require("./homework-main-use-case-error.js");
const LIST_ERROR_PREFIX = `${HomeworkMainUseCaseError.ERROR_PREFIX}list/`;

const Get = {
  UC_CODE: `${LIST_ERROR_PREFIX}List/get/`,
  
};

const Create = {
  //UC_CODE: `${LIST_ERROR_PREFIX}createList/`,

  UC_CODE: `${HomeworkMainUseCaseError.ERROR_PREFIX}list/create/`,

  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ListDaoCreateFailed: class extends HomeworkMainUseCaseError{
    constructor(){
      super(...arguments);
      this.code = `${Create.UC_CODE}listDaoCreateFail`;
      this.message = "Creation of list failed";
    }
  }
  
};

const GetProducts = {
  UC_CODE: `${LIST_ERROR_PREFIX}getProducts/`,
  
};

const Update = {
  UC_CODE: `${LIST_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const Delete = {
  UC_CODE: `${LIST_ERROR_PREFIX}delete/`,
  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const LinkProduct = {
  UC_CODE: `${LIST_ERROR_PREFIX}linkProduct/`,
  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${LinkProduct.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const UpdateProduct = {
  UC_CODE: `${LIST_ERROR_PREFIX}updateProduct/`,
  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateProduct.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
  
};



module.exports = {
  UpdateProduct,
  LinkProduct,
  Delete,
  Update,
  GetProducts,
  Create,
  Get
};
