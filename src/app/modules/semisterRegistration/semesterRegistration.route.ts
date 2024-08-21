import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { SemesterRegistrationValidation } from './semesterRegistration.validation'
import { SemesterRegistrationController } from './semisterRegistration.controller'
import auth from '../auth/auth'
import { USER_ROLE } from '../user/user.const'

const router=express.Router()

router.post('/create-semester-registration', auth(USER_ROLE.admin,USER_ROLE.superAdmin), validateRequest(SemesterRegistrationValidation.createSemesterRegistrationValidation),SemesterRegistrationController.createSemesterRegistration)

router.get('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.student),SemesterRegistrationController.getSingleSemesterRegistration)

router.patch('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validateRequest(SemesterRegistrationValidation.updateSemesterRegistrationValidation),SemesterRegistrationController.updateSemesterRegistration)

router.get('/',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.faculty,USER_ROLE.student),SemesterRegistrationController.getAllSemisterRegistration)


router.delete('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin),SemesterRegistrationController.deleteSemesterRegistration)

export const SemesterRegistrationRoutes=router