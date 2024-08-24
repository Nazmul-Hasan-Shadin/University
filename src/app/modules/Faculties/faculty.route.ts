import { USER_ROLE } from './../user/user.const'
import express from 'express'
import { FacultyControllers } from './faculty.controller'
import validateRequest from '../../middleware/validateRequest'
import { createUpdateFacultyValidateSchema } from './faculty.validate'
import auth from '../auth/auth'
import { USER_ROLE } from '../user/user.const'

const router = express.Router()

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin,USER_ROLE.faculty),
  FacultyControllers.getSingleFaculty,
)

router.patch(
  '/:id',
  auth(USER_ROLE.admin,USER_ROLE.superAdmin),
  validateRequest(createUpdateFacultyValidateSchema),
  FacultyControllers.updateFaculty,
)

router.delete('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin), FacultyControllers.deleteFaculty)
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty,USER_ROLE.superAdmin),
  FacultyControllers.getAllFaculties,
)

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin,USER_ROLE.faculty),
  FacultyControllers.getSingleFaculty,
)

export const FacultyRoutes = router
