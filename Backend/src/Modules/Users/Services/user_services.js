const userRepository = require("../Repository/user_repositoryMongo");
const dto = require('../Dto/user_dto');
const createEmployee = async (userData) => {

    const existingEmployee = await userRepository.findByEmployeeId(
        dto.employeeId,
        dto.tenantId
    );

    if (existingEmployee) {
        throw new Error("Employee already exists");
    }

    const existingEmail = await userRepository.findByEmail(
        userData.email,
        userData.tenantId
    );
    if (existingEmail) {
        throw new Error("Email already exists");
    }
    const user = await userRepository.createUser(userData);

    return user;
};

const getUsers = async (query) => {
    const page = Math.max(parseInt(query.page) || 1, 1);
    const pageSize = Math.max(parseInt(query.pageSize) || 10, 1);

    const search = query.search?.trim() || "";
    const status = query.status || null;

    const allowedSortFields = ["name", "createdAt", "employeeId"];
    const sortBy = allowedSortFields.includes(query.sortBy)
        ? query.sortBy
        : "createdAt";

    const order = query.order === "asc" ? "asc" : "desc";

    const { users, totalRecords } = await userRepository.getUsers({
        tenantId: query.tenantId,
        page,
        pageSize,
        search,
        status,
        sortBy,
        order
    });

    return {
        users,
        pagination: {
            page,
            pageSize,
            totalRecords,
            totalPages: Math.ceil(totalRecords / pageSize)
        }
    };
};
const updateEmployee = async (id, tenantId, dto) => {
    const existingEmployee = await userRepository.findByEmployeeId(id, tenantId);
    if (!existingEmployee) {
        throw new Error("Employee not found")
    }
    if (dto.email && dto.email !== existingEmployee.email) {
        const emailExist = await userRepository.findByEmail(dto.email, tenantId);
        if (emailExist) {
            throw new Error("Email already exist")
        }
    }
    const updatedUser = await userRepository.updateUserData(
        id,
        tenantId,
        dto
    )
    return updatedUser;
}
const deactivateUser = async (id, tenantId) => {
    const user = await userRepository.findById(id, tenantId);
    if (!user) {
        throw new Error("User is not found")
    }
    if (user?.status === "INACTIVE") {
        throw new Error("Employee is already inactive")
    }
    const updatedUser = await userRepository.deactivateUser(id, tenantId);
    return updatedUser;
}
module.exports = {
    createEmployee,
    getUsers,
    updateEmployee ,
    deactivateUser
};

