import express from 'express'
import { AcademicSemisterControllers } from './academicSemister.controller'
import validateRequest from '../../middleware/validateRequest'
import { AcademicSemisterValidations } from './academicSemisterValidation'


const router = express.Router()

// will call controller func

 router.post('/create-academic-semister',validateRequest(AcademicSemisterValidations.createAcademicSemisterValidationSemister),AcademicSemisterControllers.createAcademicSemister)

 router.get('/:semesterId',AcademicSemisterControllers.getSingleAcademicSemister)

 router.patch('/:semesterId',AcademicSemisterControllers.updateAcademicSemister)

 router.get('/',AcademicSemisterControllers.getAllAcademicSemister)

export const AcademicSemisterRoutes = router
