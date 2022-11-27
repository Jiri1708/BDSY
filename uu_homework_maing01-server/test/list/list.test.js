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

describe("Create LIST", () => {
  test("Happy Path - no products added", async () => {
    let dtoIn = {
      name: "Alza 27.12",
      ownerId: "3627-8321-1",
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
        ownerId: "3627-8321-1",
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
        ownerId: "3627-8321-1",
        productList: [{ id: "46546", quantity: 444, purchased: false }],
      };

      try {
        await TestHelper.executePostCommand("list/create", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("Selected product does not exist");
        expect(error.status).toEqual(400);
      }
    });
});

describe("Update LIST", () => {
  test("Happy Path", async () => {
    let lists = await TestHelper.executeGetCommand("list/get");

    let dtoIn = {
      name: "Test1",
      ownerId: "3627-8321-1",
      id: lists.lists.itemList[0].id,
    };

    let result = await TestHelper.executePostCommand("list/update", dtoIn);

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
    expect(result.data.name).toBe("Test1");
  }),
    test("Alternative fail", async () => {
      let dtoIn = {
        name: "Test1",
        ownerId: "3627-8321-1",
        id: "445asd",
      };

      try {
        await TestHelper.executePostCommand("list/update", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("Update of list failed");
        expect(error.status).toEqual(400);
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
    test("Alternative fail", async () => {
      let dtoIn = {
        id: "4465asd",
      };

      expect.assertions(2);
     
      try {
        await TestHelper.executePostCommand("list/delete", dtoIn);
      } catch (error) {
        expect(error.message).toEqual("Specified ID does not exists");
        expect(error.status).toEqual(400);
      }
    });
});
