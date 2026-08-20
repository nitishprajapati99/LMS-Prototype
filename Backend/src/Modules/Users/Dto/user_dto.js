
const createUserDTO = (body) => {
  return {
    tenantId: body.tenantId,
    departmentId: body.departmentId,
    roleId: body.roleId,
    employeeId: body.employeeId.trim(),
    name: body.name.trim(),
    email: body.email.toLowerCase().trim(),
  };
};
const updateUserDTO = (body) => {
    const dto = {};
    if (body.name !== undefined) {
        dto.name = body.name.trim();
    }

    if (body.email !== undefined) {
        dto.email = body.email.toLowerCase().trim();
    }

    if (body.departmentId !== undefined) {
        dto.departmentId = body.departmentId;
    }

    if (body.roleId !== undefined) {
        dto.roleId = body.roleId;
    }

    if (body.status !== undefined) {
        dto.status = body.status;
    }

    return dto;
};
const deactivateUserDTO = () => ({
    status: "INACTIVE"
});

module.exports = {
    createUserDTO,
    updateUserDTO ,
    deactivateUserDTO
};