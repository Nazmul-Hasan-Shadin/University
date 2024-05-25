import express, { NextFunction, Request, Response } from 'express'
import { UsersControllers } from './user.controller'

import { studentValidations } from '../student/student.validation'
import { error } from 'console'
import validateRequest from '../../middleware/validateRequest'

const router = express.Router()



router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UsersControllers.createStudent,
)

export const UserRoutes = router
