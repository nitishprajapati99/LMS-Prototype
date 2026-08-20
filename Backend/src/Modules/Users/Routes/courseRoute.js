
const express = require("express");

const router = express.Router();
const userController = require("../Controllers/user_controller");
const { createUserValidation , deactivateUserValidation } = require("../Validators/user_validation");

//To create the employee 
router.post( "/", createUserValidation, userController.createEmployee );
//To get the list employee , search and filter employee
router.get( "/", userController.getUsers );
//To deactivate the user
router.patch("/:id/deactivate" ,userController.deactivateEmployee)
//To update the employee data
router.patch( "/:tenantId/:id",deactivateUserValidation, userController.updateEmployee );
module.exports = router;