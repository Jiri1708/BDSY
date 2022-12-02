/* eslint-disable */
const listCreateDtoInType = shape({
  name: uu5String(255).isRequired(),
  identityList: array(uuIdentity().isRequired()),
  productList: array(
    shape({
      id: id().isRequired(),
      quantity: number().isRequired(),
    })
  ),
});

const listUpdateDtoInType = shape({
  name: uu5String(255).isRequired(),
  id: id().isRequired(),
  identityList: array(uuIdentity().isRequired()),
});

const listGetDtoInType = shape({
  id: id(),
});

const listDeleteDtoInType = shape({
  id: id().isRequired(),
});

const listGetProductDtoInType = shape({
  id: id().isRequired(),
});

const listLinkProductDtoInType = shape({
  id: id().isRequired(),
  productList: array(
    shape({
      id: id().isRequired(),
      quantity: number().isRequired(),
    })
  ).isRequired(),
});

const listUpdateProductDtoInType = shape({
  id: id().isRequired(),
  productList: array(
    shape({
      id: id().isRequired(),
      quantity: number().isRequired(),
      purchased: boolean().isRequired(),
    })
  ).isRequired(),
});
