const { body } = require("express-validator");

const createCourseValidation = [
    body("tenantd")
        .notEmpty()
        .withMessage("Tenant ID is required")
        .isMongoId()
        .withMessage("Invalid Tenant ID"),

    body("categoryId")
        .notEmpty()
        .withMessage("Category ID is required")
        .isMongoId()
        .withMessage("Invalid Category ID "),

    body("CreatedBy")
        .notEmpty()
        .withMessage("Category ID is required")
        .isMongoId()
        .withMessage("Invalid Category ID "),

    body("UpdatedBy")
        .notEmpty()
        .withMessage("Category ID is required")
        .isMongoId()
        .withMessage("Invalid Category ID "),

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Course title is required")
        .isLength({ min: 3, max: 150 })
        .withMessage("Title must be between 3 and 150 characters"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Course description is required")
        .isLength({ min: 10 })
        .withMessage("Description must be at least 10 characters"),
]

module.exports = {
    createCourseValidation
}