import express from 'express'
import validateRequest from '../../middleware/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseController } from './course.controller';
import { CourseServices } from './course.services';
const router= express.Router()

 router.post('/create-course',validateRequest(CourseValidations.createCourseValidationSchema),CourseController.createCourse)

 router.get('/:id',CourseController.getSingleCourse);

 router.patch('/:id',validateRequest(CourseValidations.updateCourseValidationSchema),CourseController.updateCourse)

 router.get('/',CourseController.getAllCourses)
 router.delete('/:id',CourseController.deleteCourse)

 export const CourseRoutes=router