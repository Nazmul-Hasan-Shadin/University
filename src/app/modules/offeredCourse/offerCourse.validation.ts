import { z } from "zod";
import { Days } from "./offeredCourse.const";

 const timeStringSchema=z.string().refine(time=>{
    const regex= /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return regex.test(time)

},{
    message:'Invalid time format'
})

const createOfferedCourseValidationSchema= z.object({
    body:z.object({
        semesterRegistration:z.string(),
     
        academicFaculty:z.string(),
        academicDepartment:z.string(),
        course:z.string(),
        faculty: z.string(),
        maxCapacity:z.number(),
        section:z.number(),
        days:z.array( z.enum([...Days] as [string, ...string[]])),
        startTime:timeStringSchema,
        endTime:timeStringSchema,
    }).refine((body)=>{
        const start = new Date(`1971-01-01T${body.startTime}:00`);
        const end = new Date(`1971-01-01T${body.endTime}:00`);
        return end > start
    },{
        message:'start time should be before end time'
    })
})


const updateOfferedCourseValidationSchema= z.object({
    body:z.object({
     
       
        faculty: z.string(),
        maxCapacity:z.number(),
        section:z.number(),
        days:z.array( z.enum([...Days] as [string, ...string[]])),
        startTime:timeStringSchema,
        endTime:timeStringSchema,
    }).refine((body)=>{
        const start = new Date(`1971-01-01T${body.startTime}:00`);
        const end = new Date(`1971-01-01T${body.endTime}:00`);
        return end > start
    },{
        message:'start time should be before end time'
    })
})

export const OfferdCourseValidations={
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
}