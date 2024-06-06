import express from 'express'
import { StudentRoutes } from '../modules/student/student.route'
import { UserRoutes } from '../modules/user/user.routes'
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes'
import { FacultyRoutes } from '../modules/Faculties/faculty.route'
import { AdminRoutes } from '../modules/Admin/admin.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semister',
    route: AcademicSemisterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
  {
    path:'/faculties',
    route:FacultyRoutes
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
