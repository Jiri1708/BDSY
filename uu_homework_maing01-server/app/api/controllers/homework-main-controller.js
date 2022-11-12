"use strict";
const HomeworkMainAbl = require("../../abl/homework-main-abl.js");

class HomeworkMainController {
  init(ucEnv) {
    return HomeworkMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return HomeworkMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return HomeworkMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new HomeworkMainController();
