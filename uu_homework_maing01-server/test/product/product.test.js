const { TestHelper } = require("uu_appg01_server-test");
const dtoIn1 = {
  name: "Mouka",
  measureUnit: "kg",
};
const dtoIn2 = {
  name: "Cukr",
  measureUnit: "kg",
};
const dtoIn3 = {
  name: "Kava",
  measureUnit: "kg",
};
var listOfProducts = [];

beforeAll(async () => {
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGALL" });
});
afterAll(async () => {
  await TestHelper.teardown();
});
describe("Create Product", () => {
  test("Happy Path", async () => {
    let result = await TestHelper.executePostCommand("product/create", dtoIn1);

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toEqual({});
    expect(result.data).toEqual(expect.objectContaining(dtoIn1));
  }),
    test("Alternative scenario", async () => {
      let dtoIn = {
        testing: false,
        measureUnit: 1,
      };
      expect.assertions(2);
      try {
        await TestHelper.executePostCommand("product/create", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("DtoIn is not valid.");
        expect(error.status).toEqual(400);
      }
    });
});
describe("Get Product", () => {
  test("Happy Path - list", async () => {
    await TestHelper.executePostCommand("product/create", dtoIn2);
    await TestHelper.executePostCommand("product/create", dtoIn3);
    listOfProducts = await TestHelper.executeGetCommand("product/get");
    expect(listOfProducts.status).toEqual(200);
    expect(listOfProducts.data.uuAppErrorMap).toEqual({});
    expect(listOfProducts.data.itemList.length).toEqual(3);
  }),
    test("Happy Path - id", async () => {
      let processedList = [];
      for (let index = 1; index < listOfProducts.itemList.length; index++) {
        const element = listOfProducts.itemList[index];
        processedList.push({ id: element.id });
      }
      let result = await TestHelper.executeGetCommand("product/get", { idList: processedList });
      expect(result.status).toEqual(200);
      expect(result.data.uuAppErrorMap).toEqual({});
      expect(result.data.productList.length).toEqual(2);
    }),
    test("Alternative scenario - id", async () => {
      let idList = [
        {
          id: "11177f493777d44069efe494",
        },
      ];

      let result = await TestHelper.executeGetCommand("product/get", { idList });
      expect(result.status).toEqual(200);
      expect(result.data.uuAppErrorMap).toEqual({});
      expect(result.data.productList).toEqual([]);
    });
});
describe("Update Product", () => {
  test("Happy Path", async () => {
    listOfProducts = await TestHelper.executeGetCommand("product/get");

    let updateProduct = {
      id: listOfProducts.itemList[0].id,
      name: "test1",
      measureUnit: "test1MS",
    };
    let updatedProduct = await TestHelper.executePostCommand("product/update", updateProduct);

    expect(updatedProduct.status).toEqual(200);
    expect(updatedProduct.data.uuAppErrorMap).toEqual({});
    expect(updatedProduct.data.name).toBe("test1");
    expect(updatedProduct.data.measureUnit).toBe("test1MS");
  }),
    test("Alternative scenario invalid ID - update", async () => {
      let dtoIn = {
        id: "11177f493777d44069efe494",
        name: "test1 fail",
        measureUnit: "g",
      };
      expect.assertions(2);
      try {
        await TestHelper.executePostCommand("product/update", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("Update of product failed");
        expect(error.status).toEqual(400);
      }
    }),
    test("Alternative scenario invalid dtoIn- update", async () => {
      let dtoIn = {
        measureUnit: "g",
      };
      expect.assertions(2);
      try {
        await TestHelper.executePostCommand("product/update", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("DtoIn is not valid.");
        expect(error.status).toEqual(400);
      }
    });
});
