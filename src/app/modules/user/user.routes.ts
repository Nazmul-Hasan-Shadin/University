import express, { NextFunction, Request, Response } from 'express'
import { UsersControllers } from './user.controller'

import { studentValidations } from '../student/student.validation'
import { error } from 'console'
import validateRequest from '../../middleware/validateRequest'
import { createFacultyValidateSchema } from '../Faculties/faculty.validate'
import { createAdminValidationSchema } from '../Admin/admin.validate'
import auth from '../auth/auth'
import { USER_ROLE } from './user.const'
import { UserValidation } from './user.validation'
import { upload } from '../../utils/sendImageToCloudinary'

const router = express.Router()

router.post(
  '/create-faculty',
 
  upload.single('file'),
  (req:Request,res:Response,next:NextFunction)=>{
    req.body=JSON.parse(req.body.data);
    next()
  },
  auth(USER_ROLE.admin,USER_ROLE.superAdmin),
  validateRequest(createFacultyValidateSchema),
  UsersControllers.createFaculty)

router.post(
  '/create-student', auth(USER_ROLE.admin,USER_ROLE.superAdmin),
  upload.single('file'),
  (req:Request,res:Response,next:NextFunction)=>{
    req.body=JSON.parse(req.body.data);
    next()
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  UsersControllers.createStudent,
)

router.post(
  '/create-admin',
 
  auth(USER_ROLE.admin,USER_ROLE.superAdmin),
  validateRequest(createAdminValidationSchema),
  UsersControllers.createAdmin,
);
router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin,USER_ROLE.superAdmin),
  validateRequest(UserValidation.userValidationChangeStatus),
  UsersControllers.userStatus,
);

router.get(
  '/me',
  auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.student,USER_ROLE.faculty),
 
  UsersControllers.getMe,
);


export const UserRoutes = router
