const { TestHelper } = require("uu_appg01_server-test");

beforeAll(async () => {
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGALL" });
  await TestHelper.executePostCommand("product/create", { name: "Mouka", measureUnit: "kg" });
  await TestHelper.executePostCommand("product/create", { name: "Cukr", measureUnit: "kg" });
  await TestHelper.executePostCommand("product/create", { name: "Kava", measureUnit: "kg" });
});

afterAll(async () => {
  await TestHelper.teardown();
});
//Done
describe("Create LIST", () => {
  test("Happy Path - no products added", async () => {
    let dtoIn = {
      name: "Alza 27.12",
      productList: [],
    };

    let result = await TestHelper.executePostCommand("list/create", dtoIn);

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
  }),
    test("Happy Path - products added", async () => {
      let products = await TestHelper.executeGetCommand("product/get");
      let dtoIn = {
        name: "Alza 27.12",
        productList: [],
      };
      for (let index = 0; index < products.length; index++) {
        const element = products[index];
        dtoIn.productList.push({
          id: element.id,
          quantity: Math.random(),
          purchased: false,
        });
      }

      let result = await TestHelper.executePostCommand("list/create", dtoIn);

      expect(result.status).toEqual(200);
      expect(result.data.uuAppErrorMap).toBeDefined();
    }),
    test("Alternative productDoesNotExists", async () => {
      let dtoIn = {
        name: "Alza 27.12",
        productList: [{ id: "63877f493777d44069efe494", quantity: 444, purchased: false }],
      };

      try {
        await TestHelper.executePostCommand("list/create", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("Selected product does not exist");
        expect(error.status).toEqual(400);
      }
    }),
    test("Alternative invalidDtoIn", async () => {
      let dtoIn = {
        productList: [{ id: "46546", quantity: 444, purchased: false }],
      };

      try {
        await TestHelper.executePostCommand("list/create", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("DtoIn is not valid.");
        expect(error.status).toEqual(400);
      }
    });
});

describe("Update LIST", () => {
  test("Happy Path", async () => {
    let lists = await TestHelper.executeGetCommand("list/get");

    let dtoIn = {
      name: "Test1",
      id: lists.lists.itemList[0].id,
      identityList: [],
    };

    let result = await TestHelper.executePostCommand("list/update", dtoIn);

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
    expect(result.data.name).toBe("Test1");
  }),
    test("Alternative fail - dtoIn", async () => {
      let dtoIn = {};

      expect.assertions(2);

      try {
        await TestHelper.executePostCommand("list/update", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("DtoIn is not valid.");
        expect(error.status).toEqual(400);
      }
    }),
    test("Alternative fail - list does not exist", async () => {
      let dtoIn = {
        id: "638a73ac24992c69821b987b",
        name: "Test update",
      };

      expect.assertions(2);

      try {
        await TestHelper.executePostCommand("list/update", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("Specified ID does not exist");
        expect(error.status).toEqual(404);
      }
    });
});

describe("Delete LIST", () => {
  test("Happy Path", async () => {
    let lists = await TestHelper.executeGetCommand("list/get");

    let dtoIn = {
      id: lists.lists.itemList[0].id,
    };

    let result = await TestHelper.executePostCommand("list/delete", dtoIn);

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();

    lists = await TestHelper.executeGetCommand("list/get");

    lists = lists.lists.itemList.filter((x) => x.id == dtoIn.id);
    expect(lists).toEqual([]);
  }),
    test("Alternative fail - invalid Id", async () => {
      let dtoIn = {
        id: "63877f493777d44069efe494",
      };

      expect.assertions(2);

      try {
        await TestHelper.executePostCommand("list/delete", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("Specified ID does not exists");
        expect(error.status).toEqual(400);
      }
    }),
    test("Alternative fail - dtoIn", async () => {
      let dtoIn = {};

      expect.assertions(2);

      try {
        await TestHelper.executePostCommand("list/delete", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("DtoIn is not valid.");
        expect(error.status).toEqual(400);
      }
    });
});

describe("Update List's product", () => {
  test("Happy Path", async () => {
    let products = await TestHelper.executeGetCommand("product/get");
    let dtoIn = {
      name: "Alza 27.12",
      productList: [],
    };
    for (let index = 0; index < products.data.itemList.length; index++) {
      const element = products.data.itemList[index];
      dtoIn.productList.push({
        id: element.id,
        quantity: Math.random() * 100,
        purchased: false,
      });
    }
    //vytvoreni listu s produkty
    let listCreate = await TestHelper.executePostCommand("list/create", dtoIn);

    let dtoIn2 = {
      id: listCreate.data.id,
      productList: [],
    };

    for (let index = 0; index < listCreate.data.productList.length; index++) {
      const element = listCreate.data.productList[index];
      dtoIn2.productList.push({
        id: element.id,
        quantity: element.quantity,
        purchased: true,
      });
    }

    let result = await TestHelper.executePostCommand("list/updateProduct", dtoIn2);

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();

    //check update of one product
    let dtoIn3 = { ...dtoIn2 };
    dtoIn3.productList = dtoIn3.productList.slice(dtoIn3.length - 1);
    dtoIn3.productList[0].purchased = false;
    let updateOfOneProduct = await TestHelper.executePostCommand("list/updateProduct", dtoIn2);

    expect(updateOfOneProduct.data.productList.length).toEqual(dtoIn2.productList.length);
  }),
    test("Alternative fail - no product added to array", async () => {
      let products = await TestHelper.executeGetCommand("product/get");
      let dtoIn = {
        name: "Alza 27.12",
        productList: [],
      };
      for (let index = 0; index < products.data.itemList.length; index++) {
        const element = products.data.itemList[index];
        dtoIn.productList.push({
          id: element.id,
          quantity: Math.random() * 100,
          purchased: false,
        });
      }
      //vytvoreni listu s produkty
      let listCreate = await TestHelper.executePostCommand("list/create", dtoIn);

      let dtoIn2 = {
        id: listCreate.data.id,
        productList: [],
      };

      try {
        await TestHelper.executePostCommand("list/updateProduct", dtoIn2);
      } catch (error) {
        expect(error.message).toEqual("Update of products went wrong: Product not present");
        expect(error.status).toEqual(400);
      }
    }),
    test("Alternative fail - product not linked", async () => {
      let products = await TestHelper.executeGetCommand("product/get");
      let dtoIn = {
        name: "Alza 27.12",
        productList: [],
      };
      for (let index = 0; index < products.data.itemList.length; index++) {
        const element = products.data.itemList[index];
        dtoIn.productList.push({
          id: element.id,
          quantity: Math.random() * 100,
          purchased: false,
        });
      }
      //vytvoreni listu s produkty
      let listCreate = await TestHelper.executePostCommand("list/create", dtoIn);

      let dtoIn2 = {
        id: listCreate.data.id,
        productList: [
          {
            id: "638a73ac24992c69821b987b",
            quantity: Math.random() * 100,
            purchased: false,
          },
        ],
      };

      try {
        await TestHelper.executePostCommand("list/updateProduct", dtoIn2);
      } catch (error) {
        expect(error.message).toEqual("Update of products went wrong: Product not linked");
        expect(error.status).toEqual(400);
      }
    }),
    test("Alternative fail - list does not exist", async () => {
      let dtoIn = {
        id: "638a73ac24992c69821b987b",
        productList: [],
      };

      expect.assertions(2);

      try {
        await TestHelper.executePostCommand("list/updateProduct", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("Specified ID does not exist");
        expect(error.status).toEqual(404);
      }
    }),
    test("Alternative fail - dtoIn", async () => {
      let dtoIn = {};

      expect.assertions(2);

      try {
        await TestHelper.executePostCommand("list/updateProduct", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("DtoIn is not valid.");
        expect(error.status).toEqual(400);
      }
    });
});
describe("Link products to List", () => {
  test("Happy Path", async () => {
    let products = await TestHelper.executeGetCommand("product/get");
    let dtoIn = {
      name: "Alza 27.12",
      productList: [],
    };
    for (let index = 1; index < products.data.itemList.length; index++) {
      const element = products.data.itemList[index];
      dtoIn.productList.push({
        id: element.id,
        quantity: Math.random() * 100,
        purchased: false,
      });
    }
    //vytvoreni listu s produkty
    let listCreate = await TestHelper.executePostCommand("list/create", dtoIn);

    let dtoIn2 = {
      id: listCreate.data.id,
      productList: [
        {
          id: products.data.itemList[0].id,
          quantity: Math.random() * 100,
          purchased: false,
        },
      ],
    };

    let result = await TestHelper.executePostCommand("list/linkProduct", dtoIn2);

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();

   
    expect(listCreate.data.productList.length).not.toEqual(result.productList.length);
  }),
    test("Alternative fail - no product added to array", async () => {
      let products = await TestHelper.executeGetCommand("product/get");
      let dtoIn = {
        name: "Alza 27.12",
        productList: [],
      };
      for (let index = 0; index < products.data.itemList.length; index++) {
        const element = products.data.itemList[index];
        dtoIn.productList.push({
          id: element.id,
          quantity: Math.random() * 100,
          purchased: false,
        });
      }
      //vytvoreni listu s produkty
      let listCreate = await TestHelper.executePostCommand("list/create", dtoIn);

      let dtoIn2 = {
        id: listCreate.data.id,
        productList: [{ id: "638a73ac24992c69821b987b", quantity: Math.random() * 100, purchased: false }],
      };

      try {
        await TestHelper.executePostCommand("list/linkProduct", dtoIn2);
      } catch (error) {
        expect(error.message).toEqual("Update of products went wrong: Unknown productId");
        expect(error.status).toEqual(400);
      }
    }),
    test("Alternative fail - product already linked", async () => {
      let products = await TestHelper.executeGetCommand("product/get");
      let dtoIn = {
        name: "Alza 27.12",
        productList: [],
      };
      for (let index = 0; index < products.data.itemList.length; index++) {
        const element = products.data.itemList[index];
        dtoIn.productList.push({
          id: element.id,
          quantity: Math.random() * 100,
          purchased: false,
        });
      }
      //vytvoreni listu s produkty
      let listCreate = await TestHelper.executePostCommand("list/create", dtoIn);

      let dtoIn2 = {
        id: listCreate.data.id,
        productList: [
          {
            id: products.data.itemList[0].id,
            quantity: Math.random() * 100,
            purchased: false,
          },
        ],
      };

      try {
        await TestHelper.executePostCommand("list/linkProduct", dtoIn2);
      } catch (error) {
        expect(error.message).toEqual("Update of products went wrong: Product already linked");
        expect(error.status).toEqual(400);
      }
    }),
    test("Alternative fail - list does not exist", async () => {
      let dtoIn = {
        id: "638a73ac24992c69821b987b",
        productList: [],
      };

      expect.assertions(2);

      try {
        await TestHelper.executePostCommand("list/linkProduct", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("Specified ID does not exist");
        expect(error.status).toEqual(404);
      }
    }),
    test("Alternative fail - dtoIn", async () => {
      let dtoIn = {};

      expect.assertions(2);

      try {
        await TestHelper.executePostCommand("list/linkProduct", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("DtoIn is not valid.");
        expect(error.status).toEqual(400);
      }
    });
});

describe("Get LIST", () => {
  test("Happy Path - all", async () => {
    let result = await TestHelper.executeGetCommand("list/get");

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
    expect(result.data.lists).not.toBe({});
  }),
    test("Happy path - Id", async () => {
      let lists = await TestHelper.executeGetCommand("list/get");
      let dtoIn = {
        id: lists.lists.itemList[0].id,
      };

      let result = await TestHelper.executeGetCommand("list/get", dtoIn);

      expect(result.status).toEqual(200);
      expect(result.data.uuAppErrorMap).toBeDefined();
      expect(result.data.lists).not.toBe({});
    }),
    test("Alternative fail - invalidId", async () => {
      let dtoIn = {
        id: "63877f493777d44069efe494",
      };
      expect.assertions(2);
      try {
        await TestHelper.executeGetCommand("list/get", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("Specified ID does not exist");
        expect(error.status).toEqual(404);
      }
    }),
    test("Alternative fail - noList", async () => {
      let lists = await TestHelper.executeGetCommand("list/get");

      for (let index = 0; index < lists.lists.itemList.length; index++) {
        const element = lists.lists.itemList[index];
        await TestHelper.executePostCommand("list/delete", { id: element.id });
      }

      //expect.assertions(2);
      try {
        await TestHelper.executeGetCommand("list/get");
      } catch (error) {
        expect(error.message).toEqual("Application contains no list");
        expect(error.status).toEqual(404);
      }
    });
});
