/* eslint-disable */
const listCreateDtoInType = shape({
    name: uu5String(255).isRequired(),
    ownerId: uuIdentity().isRequired(),
    productList: array(
      shape({
        id: uu5String(50).isRequired(),
        quantity: number().isRequired(),
        purchased: boolean().isRequired()
      })
    )
  });

  const listUpdateDtoInType = shape({
    name: uu5String(255).isRequired(),
    ownerId: uuIdentity().isRequired(),
    id: uu5String(255).isRequired()
  });


  const listGetDtoInType = shape({
    id: uu5String(255)
  });

  const listDeleteDtoInType = shape({
    id: uu5String(255).isRequired()
  });

  const listGetProductDtoInType = shape({
    id: uu5String(255).isRequired()
  });

  const listLinkProductDtoInType = shape({
    id: uu5String(255).isRequired(),
    productList: array(
      shape({
        id: uu5String(50).isRequired(),
        quantity: number().isRequired()
      })
    ).isRequired()
  });

  const listUpdateProductDtoInType = shape({
    id: uu5String(255).isRequired(),
    productList: array(
      shape({
        id: uu5String(50).isRequired(),
        quantity: number().isRequired(),
        purchased: boolean().isRequired()
      })
    ).isRequired()
  });