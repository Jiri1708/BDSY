"use strict";
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

  //unit tests done
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
  //unit tests done
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
  //unit tests done
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
          throw new Errors.Create.ListDaoCreateProductDoesNotExistFailed({ uuAppErrorMap });
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
    dtoOut.lists = list;
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
      //is productList array empty?
      if (dtoIn.productList?.length) {
        //get saved list
        let checkedList = await this.dao.getById(awid, dtoIn.id);
        //check if productId is present in savedList
        for (let index = 0; index < dtoIn.productList.length; index++) {
          const element = dtoIn.productList[index];

          let obj = checkedList.productList?.findIndex((o) => o.id == element.id);

          if (obj < 0) {
            throw new Errors.UpdateProduct.ListDaoProductNotLinkedToList({
              uuAppErrorMap,
            });
          }

          checkedList.productList[obj].quantity = element.quantity;
          checkedList.productList[obj].purchased = element.purchased;
        }
        dtoIn.productList = checkedList.productList;
        try {
          dtoOut = await this.dao.update(dtoIn);
        } catch (e) {
          if (e instanceof ObjectStoreError) {
            throw new Errors.UpdateProduct.ListDaoUpdateProductFailed(
              {
                uuAppErrorMap,
              },
              e
            );
          }
          throw e;
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

    dtoIn.awid = awid;

    if (dtoIn.productList?.length) {
      let checkedList = await this.dao.getById(awid, dtoIn.id);
      for (let index = 0; index < dtoIn.productList.length; index++) {
        //input value product
        const element = dtoIn.productList[index];

        //check in saved list for duplicates
        let obj = checkedList.productList?.find((o) => o.id == element.id);
        if (obj) {
          throw new Errors.LinkProduct.ProductAlreadyLinkedPresent({ uuAppErrorMap });
        }

        //check whether product exists
        let check = await this.productDao.getById(awid, element.id);
        if (check === null) {
          throw new Errors.LinkProduct.ListDaoProductDoesNotExist({ uuAppErrorMap });
        } else {
          dtoIn.productList[index].name = check.name;
          dtoIn.productList[index].measureUnit = check.measureUnit;
          dtoIn.productList[index].purchased = false;
        }
      }

      try {
        dtoIn.productList = dtoIn.productList.concat(checkedList.productList);
        dtoOut = await this.dao.update(dtoIn);
        dtoOut.awid = awid;
        dtoOut.uuAppErrorMap = uuAppErrorMap;
      } catch (e) {
        if (e instanceof ObjectStoreError) {
          throw new Errors.LinkProduct.ListDaoLinkProductFailed({ uuAppErrorMap, e }, e);
        }
        throw e;
      }
    } else throw new Errors.UpdateProduct.NoProductPresent({ uuAppErrorMap });

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
  //#endregion
}

module.exports = new ListAbl();
