const { TestHelper } = require("uu_appg01_server-test");
const { update } = require("../../app/abl/list-abl");
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
    // await TestHelper.executePostCommand("product/create", dtoIn1);
    await TestHelper.executePostCommand("product/create", dtoIn2);
    await TestHelper.executePostCommand("product/create", dtoIn3);
    listOfProducts = await TestHelper.executeGetCommand("product/get");
    expect(listOfProducts.status).toEqual(200);
    expect(listOfProducts.data.uuAppErrorMap).toEqual({});
    expect(listOfProducts.data.itemList.length).toEqual(3);
  }),
    test("Happy Path - id", async () => {
      // let product1 = await TestHelper.executePostCommand("product/create", { name: "Mouka", measureUnit: "kg" });
      // let product2 = await TestHelper.executePostCommand("product/create", { name: "Kava", measureUnit: "kg" });
      // let product3 = await TestHelper.executePostCommand("product/create", { name: "Cukr", measureUnit: "kg" });

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
      // let product1 = await TestHelper.executePostCommand("product/create", { name: "Mouka", measureUnit: "kg" });
      // let product2 = await TestHelper.executePostCommand("product/create", { name: "Kava", measureUnit: "kg" });
      // let product3 = await TestHelper.executePostCommand("product/create", { name: "Cukr", measureUnit: "kg" });
      let idList = [
        {
          id: "test",
        },
      ];

      let result = await TestHelper.executeGetCommand("product/get", { idList });
      expect(result.status).toEqual(200);
      expect(result.data.uuAppErrorMap).toEqual({});
      expect(result.data.productList).toEqual([]);
    });
});

// describe("Update Product", () => {
//   test("Happy Path", async () => {
//     let updateProduct = {
//       id: listOfProducts[0].id,
//       name: "test1",
//       measureUnit: "testovaciJednotka",
//     };
//     let preUpdateProduct = await TestHelper.executeGetCommand("product/get", {
//       idList: [
//         {
//           id: updateProduct.id,
//         },
//       ],
//     });
//     let updatedProduct = await TestHelper.executePostCommand("product/update", updateProduct);

//     expect(updatedProduct.status).toEqual(200);
//     expect(updatedProduct.data.uuAppErrorMap).toEqual({});
//     expect(updatedProduct.data).objectContaining({name: expect.stringContaining("test1")});
//   });
  // ,
  //   test("Alternative scenario", async () => {
  //     let dtoIn = {
  //       id: "4444",
  //       name: "test1 fail",
  //       measureUnit: "g",
  //     };

  //     try {
  //       await TestHelper.executePostCommand("product/update", dtoIn);
  //     } catch (error) {
  //       expect(error.message).toEqual("DtoIn is not valid.");
  //       expect(error.status).toEqual(400);
  //     }
  //   });
//});
