const User = require("../user_modal");

const findByEmployeeId = async (employeeId, tenantId) => {
    return await User.findOne({
        employeeId,
        tenantId
    });
};

const findByEmail = async (email, tenantId) => {
    return await User.findOne({
        email,
        tenantId
    });
};

const createUser = async (userData) => {
    const user = await User.create(userData);

    return user;
};
const findById = async (id, tenantId) => {
    return await User.findOne({
        _id: id,
        tenantId
    });
};
const getUsers = async ({
    tenantId,
    page,
    pageSize,
    search,
    status,
    sortBy,
    order,
}) => {
    const query = { tenantId };

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { employeeId: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }

    if (status) {
        query.status = status;
    }

    const skip = (page - 1) * pageSize;

    const users = await User.find(query)
        .sort({ [sortBy]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(pageSize);

    const totalRecords = await User.countDocuments(query);

    return {
        users,
        totalRecords,
    };
};
const updateUserData = async (id, tenantId, updateData) => {
    return await User.findOneAndUpdate(
        {
            employeeId: id,
            tenantId: tenantId
        },
        {
            $set: updateData
        },
        {
            returnDocument: 'after'
        }
    );
};
const deactivateUser = async (id, tenantId) => {
    return await User.findOneAndUpdate(
        {
            _id: id,
            tenantId: tenantId
        },
        {
            $set: {
                status: "INACTIVE"
            }
        },
        {
            returnDocument: 'after'
        }
    )
}
module.exports = {
    findByEmployeeId,
    findByEmail, getUsers,
    createUser,
    updateUserData,
    deactivateUser,
    findById
};