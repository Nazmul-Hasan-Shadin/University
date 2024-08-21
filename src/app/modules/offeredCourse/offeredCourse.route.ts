import express from 'express'
import { OfferedCourseController } from './offeredCourse.controller'
import validateRequest from '../../middleware/validateRequest';
import { OfferdCourseValidations } from './offerCourse.validation';
import auth from '../auth/auth';
import { USER_ROLE } from '../user/user.const';


const router= express.Router()
router.get('/my-offered-courses' ,auth(USER_ROLE.student) ,OfferedCourseController.getMyOffereddCourses);

router.get('/:id',OfferedCourseController.getSingleOfferedCourse);
router.get('/' ,auth(USER_ROLE.admin,USER_ROLE.superAdmin) ,OfferedCourseController.getAllOfferedCourse);



router.post('/create-offered-course',auth(USER_ROLE.superAdmin,USER_ROLE.admin),validateRequest(OfferdCourseValidations.createOfferedCourseValidationSchema),OfferedCourseController.createOfferedCourse)

router.patch('/:id',auth(USER_ROLE.superAdmin,USER_ROLE.admin),validateRequest(OfferdCourseValidations.updateOfferedCourseValidationSchema),OfferedCourseController.updateOfferedCourse)
router.delete('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin),OfferedCourseController.deleteOfferedCourse)

export const OfferedCourseRoutes=router
