import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { CourseValidations } from './course.validation'
import { CourseController } from './course.controller'
import { CourseServices } from './course.services'
import { valid } from 'joi'
import { USER_ROLE } from '../user/user.const'
import auth from '../auth/auth'
const router = express.Router()

router.post(
  '/create-course', auth(USER_ROLE.superAdmin,USER_ROLE.admin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
)

router.get('/:id',  auth(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.student,USER_ROLE.faculty),CourseController.getSingleCourse)

router.patch(
  '/:id', auth(USER_ROLE.superAdmin,USER_ROLE.admin),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourse,
)

router.get('/', CourseController.getAllCourses)
router.delete('/:id', CourseController.deleteCourse)

router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin),
  validateRequest(CourseValidations.FacultiesWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse,
)
router.get(
  '/:courseId/get-faculties',
  
  CourseController.getFacultiesWithCourse,
)

router.delete(
  '/:courseId/remove-faculties', auth(USER_ROLE.superAdmin,USER_ROLE.admin),
  validateRequest(CourseValidations.FacultiesWithCourseValidationSchema),
  CourseController.removeFacultiesFromCourse,
)
export const CourseRoutes = router
