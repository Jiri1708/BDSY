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
    let dtoOut = {
      awid: awid,
      uuAppErrorMap: uuAppErrorMap,
    };
    dtoIn.awid = awid;
    let list = await this.dao.getById(awid, dtoIn.id);
    if (!list) throw new Errors.Delete.ListDoesNotExist({ uuAppErrorMap }, dtoIn);
    try {
      await this.dao.remove(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Delete.ListDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

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

    dtoIn.awid = awid;
    // DAO
    try {
      dtoOut = await this.dao.update(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.ListDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
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
    if (dtoIn.productList?.length) {
      for (let index = 0; index < dtoIn.productList.length; index++) {
        const element = dtoIn.productList[index];
        let check = await this.productDao.getById(awid, element.id);
        if (check === null) {
          throw new Errors.UpdateProduct.ListDaoProductDoesNotExist({ uuAppErrorMap });
        } else {
          dtoIn.productList[index].name = check.name;
          dtoIn.productList[index].measureUnit = check.measureUnit;
        }
      }
    }

    // DAO
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.ListDaoCreateFailed({ uuAppErrorMap }, e);
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
    let dtoOut = {
      awid: awid,
      uuAppErrorMap: uuAppErrorMap,
    };
    let list;
    //get specific list

    if (dtoIn.id) {
      list = await this.dao.getById(awid, dtoIn.id);
      if (!list) throw new Errors.Get.ListDoesNotExist({ uuAppErrorMap }, dtoIn);
      // dtoOut.lists.push(list);
    }

    // get all lists
    else {
      list = await this.dao.get(awid);
      if (!list) throw new Errors.Get.NoListExists({ uuAppErrorMap }, dtoIn);
    }
    console.log(uuAppErrorMap);
    dtoOut.lists = list;
    return dtoOut;
  }

  //#region Dummy methods
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

    dtoIn.awid = awid;
    // DAO
    try {
      //

      //is productList array empty?
      if (dtoIn.productList?.length) {
        //get saved list
        let checkedList = await this.dao.getById(awid, dtoIn.id);
        //check if productId is present in savedList
        for (let index = 0; index < dtoIn.productList.length; index++) {
          const element = dtoIn.productList[index];
          let obj = checkedList.productList.find((o) => o.id == element.id);
          if (obj) {
            dtoOut = await this.dao.update(dtoIn);
          } else {
            throw new Errors.UpdateProduct.ListDaoProductNotLinkedToList({ uuAppErrorMap });
          }
        }
      }

      //array empty
      else throw new Errors.UpdateProduct.NoProductPresent({ uuAppErrorMap });
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.ListDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
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

  //#endregion
}

module.exports = new ListAbl();
