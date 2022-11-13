"use strict";
const { Console } = require("console");
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/list-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  updateProductUnsupportedKeys: {
    code: `${Errors.UpdateProduct.UC_CODE}unsupportedKeys`,
  },
  linkProductUnsupportedKeys: {
    code: `${Errors.LinkProduct.UC_CODE}unsupportedKeys`,
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },
  getProductsUnsupportedKeys: {
    code: `${Errors.GetProducts.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
};

class ListAbl {
  constructor() {
    this.validator = Validator.load();
     this.dao = DaoFactory.getDao("list");
     this.productDao = DaoFactory.getDao("product");
  }
  async updateProduct(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("listUpdateProductDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateProductUnsupportedKeys.code,
      Errors.UpdateProduct.InvalidDtoIn
    );

    // HDS 2
    let dtoOut = { ...dtoIn };
    dtoOut.awid = awid;
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
  async linkProduct(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("listLinkProductDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.linkProductUnsupportedKeys.code,
      Errors.LinkProduct.InvalidDtoIn
    );

    // HDS 2
    let dtoOut = { ...dtoIn };
    dtoOut.awid = awid;
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
  async delete(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("listDeleteDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    // HDS 2
    let dtoOut = { ...dtoIn };
    dtoOut.awid = awid;
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
  async update(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("listUpdateDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    // HDS 2
    let dtoOut = { ...dtoIn };
    dtoOut.awid = awid;
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
  async getProducts(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("listGetProductDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getProductsUnsupportedKeys.code,
      Errors.GetProducts.InvalidDtoIn
    );

    // HDS 2
    let dtoOut = { ...dtoIn };
    dtoOut.awid = awid;
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
  async create(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("listCreateDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // check product valid
    let dtoOut = { ...dtoIn };
      dtoIn.awid = awid;
      console.log(dtoIn.productList?.length)
      console.log(dtoIn)
      if (dtoIn.productList?.length){
      for (let index = 0; index < dtoIn.productList.length; index++) {
        const element = dtoIn.productList[index];
         let check = await this.productDao.getById(awid, element.id);
          if (check === null){
            throw new Errors.Create.ListDaoCreateProductDoesNotExistFailed({uuAppErrorMap});
        }
      }
    }

    // DAO 
    try{
      dtoOut = await this.dao.create(dtoIn);
    }
    catch (e){
      if (e instanceof ObjectStoreError){
        throw new Errors.Create.ListDaoCreateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

    dtoOut.awid = awid;
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
  async get(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("listGetDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    // HDS 2
    let dtoOut = { ...dtoIn };
    dtoOut.awid = awid;
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new ListAbl();
