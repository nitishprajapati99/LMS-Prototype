const userService = require("../Services/user_services");
const { validationResult } = require("express-validator");
const { updateUserDTO, deactivateUserDTO } = require('../Dto/user_dto')
const createEmployee = async (req, res) => {
    try {
        const user = await userService.createEmployee(req.body);
        res.status(201).json({
            success: true,
            data: user
        });

    } catch (error) {
        return res.status(error.status || 400).json({
            success: false,
            message: error.message
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const query = {
            ...req.query,
            tenantId: req.user?.tenantId || req.query.tenantId
        };

        const result = await userService.getUsers(query);

        return res.status(200).json({
            success: true,
            data: result.users,
            pagination: result.pagination
        });

    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
};
const updateEmployee = async (req, res) => {
    try {
        const dto = updateUserDTO(req.body);
        const updatedUser = await userService.updateEmployee(
            req.params.id,
            req?.user?.tenantId || req.params.tenantId,
            dto
        );

        return res.status(200).json({
            success: true,
            data: updatedUser
        });
    } catch (error) {
        return res.status(error.status || 400).json({
            success: false,
            message: error.message
        });
    }
}
const deactivateEmployee = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        deactivateUserDTO();
        const updatedEmployee = await userService.deactivateUser(
            req.params.id,
            req?.user?.tenantId || req.body.tenantId
        )
        return res.status(200).json({
            success: true,
            message: "Employee deactivated successfully",
            data: updatedEmployee
        })
    } catch (error) {
        return res.status(error.status || 400).json(
            {
                success: false,
                message: error.message
            }
        )
    }
}
module.exports = {
    createEmployee,
    getUsers,
    updateEmployee,
    deactivateEmployee
};