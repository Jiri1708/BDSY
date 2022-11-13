"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/product-error.js");

const WARNINGS = {
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
};

class ProductAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("product");
  }

  async update(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("productUpdateDtoInType", dtoIn);

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

    dtoIn.awid = awid;
    // DAO
    try {
      dtoOut = await this.dao.update(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.ProductDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    return dtoOut;
  }

  async get(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("productGetDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );
    let dtoOut = { ...dtoIn };
    // HDS 2

    //get all products (no id listed)
    if (!dtoIn.idList?.length) {
      dtoOut = await this.dao.get(awid);
    }

    // get specified products
    else {
      dtoOut = {
        productList: [],
        awid: awid,
        uuAppErrorMap: {},
      };

      for (let index = 0; index < dtoIn.idList.length; index++) {
        let test = await this.dao.getById(awid, dtoIn.idList[index].id);
        dtoOut.productList.push(test);
      }
    }
    dtoOut.awid = awid;
    dtoOut.uuAppErrorMap = uuAppErrorMap;

    console.log(dtoOut);

    return dtoOut;
  }

  async create(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("productCreateDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // HDS 2
    let dtoOut = { ...dtoIn };
    dtoOut.awid = awid;
    dtoOut.uuAppErrorMap = uuAppErrorMap;

    dtoIn.awid = awid;
    // DAO
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.ProductDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    return dtoOut;
  }
}

module.exports = new ProductAbl();
