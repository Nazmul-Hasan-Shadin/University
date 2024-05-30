import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import { AcademicFacultyControllers } from './academicFacultyControllers'
const router= express.Router()

 router.post('/create-academic-faculty',validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema),AcademicFacultyControllers.createAcademicFaculty)

 router.get('/:facultyId',AcademicFacultyControllers.getSingleAcademicFaculty);

 router.patch('/:facultyId',validateRequest(AcademicFacultyValidation.updateAcademicFacultyUpdateValidationSchema),AcademicFacultyControllers.updateAcademicFaculty)

 router.get('/',AcademicFacultyControllers.getAllAcademicFaculties)

 export const AcademicFacultyRoutes=router