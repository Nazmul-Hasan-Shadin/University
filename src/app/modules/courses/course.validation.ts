import { z } from "zod";

const preRequisiteCourseValidationSchema=z.object({
    course:z.string(),
    isDleted:z.boolean().optional()
})
const createCourseValidationSchema=z.object({
    body:z.object({
        title:z.string(),
        prefix:z.string(),
        code:z.number(),
        credits:z.number(),
        preRequisiteCourse:z.array(preRequisiteCourseValidationSchema).optional()
    })
})

export const CourseValidations={
    createCourseValidationSchema
}