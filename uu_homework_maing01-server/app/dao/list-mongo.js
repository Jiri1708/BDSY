"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ListMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({awid: 1}, {unique:true});
  }


async create(uuObject){
  return await super.insertOne(uuObject);
}




}

module.exports = ListMongo;
