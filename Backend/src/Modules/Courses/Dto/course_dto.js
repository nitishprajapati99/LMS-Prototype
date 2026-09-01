const createCourseDTO = (body)=>{
return{
    tenantId:body.tenantId,
    categoryId:body.categoryId,
    title:body.title.trim(),
    description:body.description.trim(),
    createdBy:body.createdBy,
    updatedBy:body.updatedBy
}
}

module.exorts = {createCourseDTO};