import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { SemesterRegistrationValidation } from './semesterRegistration.validation'
import { SemesterRegistrationController } from './semisterRegistration.controller'

const router=express.Router()

router.post('/create-semester-registration',validateRequest(SemesterRegistrationValidation.createSemesterRegistrationValidation),SemesterRegistrationController.createSemesterRegistration)

router.get('/:id',SemesterRegistrationController.getSingleSemesterRegistration)

router.patch('/:id',SemesterRegistrationController.updateSemesterRegistration)

router.get('/',SemesterRegistrationController.getAllSemisterRegistration)

export const SemesterRegistrationRoutes=router