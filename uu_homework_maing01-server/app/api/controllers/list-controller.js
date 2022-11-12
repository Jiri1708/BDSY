"use strict";
const ListAbl = require("../../abl/list-abl.js");

class ListController {

  updateProduct(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ListAbl.updateProduct(awid, dtoIn);
  }

  linkProduct(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ListAbl.linkProduct(awid, dtoIn);
  }

  delete(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ListAbl.delete(awid, dtoIn);
  }

  update(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ListAbl.update(awid, dtoIn);
  }

  getProducts(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ListAbl.getProducts(awid, dtoIn);
  }

  create(ucEnv) {
    //return ListAbl.createList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());

    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ListAbl.create(awid, dtoIn);
  }

  get(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ListAbl.get(awid, dtoIn);
  }

}

module.exports = new ListController();
