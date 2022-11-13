"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ListMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
  async get(awid, pageInfo={}) {
    console.log(awid);
    console.log();
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
    console.log("DAO method")
    console.log("DAO method")
    console.log("----------")
    console.log(uuObject)
    
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }
}

module.exports = ListMongo;
