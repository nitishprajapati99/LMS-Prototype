const Course = require("../courses_modal");
const findByTitle = async (title, tenantId) => {
  return await Course.findOne({
    title,
    tenantId,
  });
};

const createCourse = async (courseData) => {
  return await Course.create(courseData);
};

module.exports = {
  findByTitle,
  createCourse,
};