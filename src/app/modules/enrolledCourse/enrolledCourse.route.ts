import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { EnrolledCourseValidaitions } from './enrolledCourse.validation'
import { EnrolledCourseController } from './enrolledCourse.controller'
import auth from '../auth/auth'
const router = express.Router()

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    EnrolledCourseValidaitions.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseController.createEnrolledCourse,
)

router.patch(
  '/update-enrolled-course-marks',
  auth('faculty'),
  validateRequest(
    EnrolledCourseValidaitions.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseController.updateEnrolledCourseMarks,
)

export const EnrollCourseRoutes = router
