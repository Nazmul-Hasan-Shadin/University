import express from 'express'
import { UsersControllers } from './user.controller'

const router = express.Router()

router.post('/create-student', UsersControllers.createStudent)

export const UserRoutes = router
