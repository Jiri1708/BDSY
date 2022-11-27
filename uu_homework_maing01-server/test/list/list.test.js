const { TestHelper } = require("uu_appg01_server-test");
const {Errors} = require("../../app/api/errors/list-error");

beforeAll(async () => {
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGALL" });
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
    test("Alternative productDoesNotExists", async () => {
      let dtoIn = {
        name: "Alza 27.12",
        ownerId: "3627-8321-1",
        productList: [{ id: "46546", quantity: 444, purchased: false }],
      };

      //let result = await TestHelper.executePostCommand("list/create", dtoIn);
      expect(async () => await TestHelper.executePostCommand("list/create", dtoIn)).rejects.toThrow(
      );

      // expect(function () {
      //   result;
      // }).toThrow(Errors.UpdateProduct.ListDaoProductDoesNotExist);

      //expect(result.status).toThrow("ApplicationError: Update of products went wrong: Unknown productId");
      // expect(result.data.uuAppErrorMap.message).toEqual("Update of products went wrong: Unknown productId");
    });
});
