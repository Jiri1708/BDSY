/* eslint-disable */
const identityGetRolesDtoInType = shape({
    id: uuIdentity().isRequired()
  });

  const identityRemoveRoleDtoInType = shape({
    id: uuIdentity().isRequired(),
    role: uu5String(255).isRequired()
  });
  const identityAssignRoleDtoInType = shape({
    id: uuIdentity().isRequired(),
    role: uu5String(255).isRequired()
  });