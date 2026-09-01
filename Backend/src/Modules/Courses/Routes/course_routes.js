const express = require('express');
const router = express.Router();

const {createCourse} = require('../Controller/course_controller');
const {createCourseValidation} = require('../Validations/course_validations');

router.post('/' ,createCourseValidation ,createCourse);

module.exports = router
