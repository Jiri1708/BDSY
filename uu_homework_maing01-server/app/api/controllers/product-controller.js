"use strict";
const ProductAbl = require("../../abl/product-abl.js");

class ProductController {

  update(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ProductAbl.update(awid, dtoIn);
  }

  get(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ProductAbl.get(awid, dtoIn);
  }

  create(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ProductAbl.create(awid, dtoIn);
  }

}

module.exports = new ProductController();
