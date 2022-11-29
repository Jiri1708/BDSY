"use strict";

const HomeworkMainUseCaseError = require("./homework-main-use-case-error.js");
const LIST_ERROR_PREFIX = `${HomeworkMainUseCaseError.ERROR_PREFIX}list/`;

const Get = {
  UC_CODE: `${HomeworkMainUseCaseError.ERROR_PREFIX}list/get/`,

  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ListDoesNotExist: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}listDoesNotExist`;
      this.message = "Specified ID does not exist";
      this.status = 404;
    }
  },
  NoListExists: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}noListExists`;
      this.message = "Application contains no list";
       this.status = 404;
    }
  }
};

const Create = {
  //UC_CODE: `${LIST_ERROR_PREFIX}createList/`,

  UC_CODE: `${HomeworkMainUseCaseError.ERROR_PREFIX}list/create/`,

  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ListDaoCreateFailed: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}listDaoCreateFail`;
      this.message = "Creation of list failed";
    }
  },
  ListDaoCreateProductDoesNotExistFailed: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}productDoesNotExists`;
      this.message = "Selected product does not exist";
    }
  },
};
const Update = {
  UC_CODE: `${LIST_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ListDaoUpdateFailed: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}listDaoUpdateFail`;
      this.message = "Update of list failed";
    }
  },
};

const Delete = {
  UC_CODE: `${LIST_ERROR_PREFIX}delete/`,
  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ListDaoDeleteFailed: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}listDaoDeleteFail`;
      this.message = "Delete of list failed";
    }
  },
  ListDoesNotExist: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}listDoesNotExists`;
      this.message = "Specified ID does not exists";
    }
  },
};
//Unused methods
const LinkProduct = {
  UC_CODE: `${LIST_ERROR_PREFIX}linkProduct/`,
  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${LinkProduct.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ListDaoLinkProductFailed: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${LinkProduct.UC_CODE}listDaoLinkProductFail`;
      this.message = "Link of selected product failed";
    }
  },
  NoProductPresent: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateProduct.UC_CODE}noProductPresent`;
      this.message = "Update of products went wrong: Product not present";
    }
  },
  ProductAlreadyLinkedPresent: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateProduct.UC_CODE}productAlreadyLinked`;
      this.message = "Update of products went wrong: Product already linked";
    }
  },
  ListDaoProductDoesNotExist: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateProduct.UC_CODE}listDaoProductDoesNotExist`;
      this.message = "Update of products went wrong: Unknown productId";
    }
  },
  ListDoesNotExist: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}listDoesNotExist`;
      this.message = "Specified ID does not exist";
      this.status = 404;
    }
  },
};

const UpdateProduct = {
  UC_CODE: `${LIST_ERROR_PREFIX}updateProduct/`,
  InvalidDtoIn: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateProduct.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ListDaoUpdateProductFailed: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateProduct.UC_CODE}listDaoUpdateProductFail`;
      this.message = "Update of selected product failed";
    }
  },
  ListDaoProductDoesNotExist: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateProduct.UC_CODE}listDaoProductDoesNotExist`;
      this.message = "Update of products went wrong: Unknown productId";
    }
  },
  ListDaoProductNotLinkedToList: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateProduct.UC_CODE}listDaoProductNotLinkedToList`;
      this.message = "Update of products went wrong: Product not linked";
    }
  },
  NoProductPresent: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateProduct.UC_CODE}noProductPresent`;
      this.message = "Update of products went wrong: Product not present";
    }
  },
  ListDoesNotExist: class extends HomeworkMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}listDoesNotExist`;
      this.message = "Specified ID does not exist";
      this.status = 404;
    }
  },
};

const GetProducts = {
  UC_CODE: `${LIST_ERROR_PREFIX}getProducts/`,
};

module.exports = {
  UpdateProduct,
  LinkProduct,
  Delete,
  Update,
  GetProducts,
  Create,
  Get,
};
