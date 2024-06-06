import express from 'express'
import validateRequest from '../../middleware/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseController } from './course.controller';
const router= express.Router()

 router.post('/create-course',validateRequest(CourseValidations.createCourseValidationSchema),CourseController.createCourse)

 router.get('/:id',CourseController.getSingleCourse);

//  router.patch('/:facultyId',validateRequest(AcademicFacultyValidation.updateAcademicFacultyUpdateValidationSchema),AcademicFacultyControllers.updateAcademicFaculty)

 router.get('/',CourseController.getAllCourses)
 router.delete('/',CourseController.deleteCourse)

 export const CourseRoutes=router