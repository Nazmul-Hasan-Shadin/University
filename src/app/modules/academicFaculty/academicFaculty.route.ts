import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import { AcademicFacultyControllers } from './academicFacultyControllers'
import auth from '../auth/auth'
import { USER_ROLE } from '../user/user.const'
const router= express.Router()

 router.post('/create-academic-faculty',auth(USER_ROLE.superAdmin,USER_ROLE.admin),validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema),AcademicFacultyControllers.createAcademicFaculty)

 router.get('/:facultyId',AcademicFacultyControllers.getSingleAcademicFaculty);

 router.patch('/:facultyId',validateRequest(AcademicFacultyValidation.updateAcademicFacultyUpdateValidationSchema),AcademicFacultyControllers.updateAcademicFaculty)

 router.get('/', auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.superAdmin),AcademicFacultyControllers.getAllAcademicFaculties)

 export const AcademicFacultyRoutes=router