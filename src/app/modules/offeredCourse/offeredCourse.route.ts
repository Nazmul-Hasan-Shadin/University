import express from 'express'
import { OfferedCourseController } from './offeredCourse.controller'
import validateRequest from '../../middleware/validateRequest';
import { OfferdCourseValidations } from './offerCourse.validation';


const router= express.Router()

router.get('/',OfferedCourseController.getSingleOfferedCourse);
router.get('/',OfferedCourseController.getAllOfferedCourse);



router.post('/create-offered-course',validateRequest(OfferdCourseValidations.createOfferedCourseValidationSchema),OfferedCourseController.createOfferedCourse)

router.patch('/:id',validateRequest(OfferdCourseValidations.updateOfferedCourseValidationSchema),OfferedCourseController.updateOfferedCourse)
router.delete('/:id',OfferedCourseController.deleteOfferedCourse)

export const OfferedCourseRoutes=router
