const courseRepository = require('../Repository/course_repository');

const createCourse = async (courseData) => {
  const courseExist = await courseRepository.findByTitle(
    courseData.title,
    courseData.tenantId
  )
  if (courseExist) {
    throw new Error("Course already exist")
  }

  const createdCourse = await courseRepository.createCourse(courseData);
  return createdCourse;
}

module.exports = {
  createCourse,
};