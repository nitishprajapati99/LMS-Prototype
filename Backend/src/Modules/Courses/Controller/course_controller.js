const courseServices = require('../Services/course_services');
const {createCourseDTO} = require('../Dto/course_dto');
const createCourse = async (req , res) =>{
try{
  const dto = createCourseDTO(req.body);
    const course = await courseServices.createCourse(dto);

    return res.status(201).json({
      success: true,
      data: course,
    });
}catch(error){
  return res.status(error.status || 400).json({
    success:false,
    message:error.message
  })
}
}

module.exports = {
  createCourse
}