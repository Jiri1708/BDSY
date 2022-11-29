"use strict";
const ProductAbl = require("../../abl/product-abl.js");

class ProductController {

  update(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ProductAbl.update(awid, dtoIn, ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  get(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ProductAbl.get(awid, dtoIn);
  }

  create(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ProductAbl.create(awid, dtoIn, ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

}

module.exports = new ProductController();
