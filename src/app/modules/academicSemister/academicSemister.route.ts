import express from 'express'
import { AcademicSemisterControllers } from './academicSemister.controller'
import validateRequest from '../../middleware/validateRequest'
import { AcademicSemisterValidations } from './academicSemisterValidation'
import auth from '../auth/auth'
import { USER_ROLE } from '../user/user.const'


const router = express.Router()

// will call controller func

 router.post('/create-academic-semister', auth(USER_ROLE.superAdmin,USER_ROLE.admin), validateRequest(AcademicSemisterValidations.createAcademicSemisterValidationSemister),AcademicSemisterControllers.createAcademicSemister)

 router.get('/:semesterId',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.student),AcademicSemisterControllers.getSingleAcademicSemister)

 router.patch('/:semesterId',auth(USER_ROLE.superAdmin,USER_ROLE.admin),AcademicSemisterControllers.updateAcademicSemister)

 router.get('/',auth('admin'),AcademicSemisterControllers.getAllAcademicSemister)

export const AcademicSemisterRoutes = router
