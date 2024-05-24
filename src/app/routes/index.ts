import express from 'express'
import { StudentRoutes } from '../modules/student/student.route'
import { UserRoutes } from '../modules/user/user.routes'
const router = express.Router()

router.use('/students',StudentRoutes)
router.use('/users',UserRoutes)
export default router
