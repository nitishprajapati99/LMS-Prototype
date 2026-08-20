
const { body  , param} = require("express-validator");

const createUserValidation = [
  body("tenantId")
    .notEmpty()
    .withMessage("Tenant ID is required")
    .isMongoId()
    .withMessage("Invalid Tenant ID"),

  body("departmentId")
    .notEmpty()
    .withMessage("Department ID is required")
    .isMongoId()
    .withMessage("Invalid Department ID"),

  body("roleId")
    .notEmpty()
    .withMessage("Role ID is required")
    .isMongoId()
    .withMessage("Invalid Role ID"),

  body("employeeId")
    .trim()
    .notEmpty()
    .withMessage("Employee ID is required"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be between 3 and 100 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),
];

 const deactivateUserValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid employee id")
];

module.exports = {
  createUserValidation,
  deactivateUserValidation
};