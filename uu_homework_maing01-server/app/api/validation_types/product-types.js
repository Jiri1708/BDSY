/* eslint-disable */
const productUpdateDtoInType = shape({
    name: uu5String(255).isRequired(),
    measureUnit: uu5String(10).isRequired()
  });

  const productGetDtoInType = shape({
    idList: array(
      shape({
        id: uu5String(50).isRequired()
      })
    )
  });
  const productCreateDtoInType = shape({
    name: uu5String(255).isRequired(),
    measureUnit: uu5String(10).isRequired()
  });