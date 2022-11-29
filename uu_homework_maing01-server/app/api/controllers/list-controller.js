"use strict";
const ListAbl = require("../../abl/list-abl.js");

class ListController {

  updateProduct(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ListAbl.updateProduct(awid, dtoIn, ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  linkProduct(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ListAbl.linkProduct(awid, dtoIn, ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  delete(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ListAbl.delete(awid, dtoIn, ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  update(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ListAbl.update(awid, dtoIn, ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  getProducts(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ListAbl.getProducts(awid, dtoIn, ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  create(ucEnv) {
    //return ListAbl.createList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());

    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ListAbl.create(awid, dtoIn, ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  get(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ListAbl.get(awid, dtoIn);
  }

}

module.exports = new ListController();
