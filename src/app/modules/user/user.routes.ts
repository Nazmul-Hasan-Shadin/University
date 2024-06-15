import express, { NextFunction, Request, Response } from 'express'
import { UsersControllers } from './user.controller'

import { studentValidations } from '../student/student.validation'
import { error } from 'console'
import validateRequest from '../../middleware/validateRequest'
import { createFacultyValidateSchema } from '../Faculties/faculty.validate'
import { createAdminValidationSchema } from '../Admin/admin.validate'
import auth from '../auth/auth'
import { USER_ROLE } from './user.const'

const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidateSchema),
  UsersControllers.createFaculty)

router.post(
  '/create-student', auth(USER_ROLE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  UsersControllers.createStudent,
)

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UsersControllers.createAdmin,
);

export const UserRoutes = router
