import express from 'express'
import { AcademicSemisterControllers } from './academicSemister.controller'
import validateRequest from '../../middleware/validateRequest'
import { AcademicSemisterValidations } from './academicSemisterValidation'


const router = express.Router()

// will call controller func

 router.post('/create-academic-semister',validateRequest(AcademicSemisterValidations.createAcademicSemisterValidationSemister),AcademicSemisterControllers.createAcademicSemister)

export const AcademicSemisterRoutes = router
