"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ProductMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
  async get(awid, pageInfo={}) {
    return await super.find({awid}, pageInfo);
  }
  async getById(awid, id) {
    let filter = {
      awid: awid,
      id: id,
    };
       return await super.findOne(filter);
  }
  async remove(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.deleteOne(filter);
  }
  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }
}

module.exports = ProductMongo;
