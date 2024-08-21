import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { EnrolledCourseValidaitions } from './enrolledCourse.validation'
import { EnrolledCourseController } from './enrolledCourse.controller'
import auth from '../auth/auth'
import { USER_ROLE } from '../user/user.const'
const router = express.Router()

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    EnrolledCourseValidaitions.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseController.createEnrolledCourse,
)

router.get(
  '/my-enrolled-courses',
  auth(USER_ROLE.student),
  EnrolledCourseController.getMyEnrolledCourses,
);


router.patch(
  '/update-enrolled-course-marks',
  auth('faculty','admin','superAdmin'),
  validateRequest(
    EnrolledCourseValidaitions.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseController.updateEnrolledCourseMarks,
)

export const EnrollCourseRoutes = router
