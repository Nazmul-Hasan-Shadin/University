import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../middleware/validateRequest'
import { studentValidations } from './student.validation'
import { USER_ROLE } from '../user/user.const'
import auth from '../auth/auth'

const router = express.Router()

// will call controller func

router.get('/', auth(USER_ROLE.admin,USER_ROLE.superAdmin),StudentControllers.getAllStudents)

router.get('/:id',auth(USER_ROLE.admin,USER_ROLE.superAdmin,USER_ROLE.student), StudentControllers.getSingleStudent)
router.delete('/:studentId',auth(USER_ROLE.admin,USER_ROLE.superAdmin), StudentControllers.deleteStudent)
router.patch('/:studentId',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validateRequest(studentValidations.updateStudentValidationSchema), StudentControllers.updateStudent)

export const StudentRoutes = router
