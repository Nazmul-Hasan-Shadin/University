import express from 'express'
import validateRequest from '../../middleware/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseController } from './course.controller';
import { CourseServices } from './course.services';
import { valid } from 'joi';
const router= express.Router()

 router.post('/create-course',validateRequest(CourseValidations.createCourseValidationSchema),CourseController.createCourse)

 router.get('/:id',CourseController.getSingleCourse);

 router.patch('/:id',validateRequest(CourseValidations.updateCourseValidationSchema),CourseController.updateCourse)

 router.get('/',CourseController.getAllCourses)
 router.delete('/:id',CourseController.deleteCourse)

 router.put('/:courseId/assign-faculties', validateRequest(CourseValidations.FacultiesWithCourseValidationSchema), CourseController.assignFacultiesWithCourse)

 router.delete('/:courseId/remove-faculties', validateRequest(CourseValidations.FacultiesWithCourseValidationSchema), CourseController.removeFacultiesFromCourse)
 export const CourseRoutes=router