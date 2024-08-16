import { RequestHandler } from 'express'

import { UserServices } from './user.services'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { AppError } from '../../errors/appError'

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  // creating a schema validation using jod

  const { password, student: studentData } = req.body

  const result = await UserServices.createStudentIntoDb(
    password,
    studentData,
    req.file,
  )

  // res.status(200).json({
  //   success: true,
  //   message: 'Student is created successfully',
  //   data: result,
  // })

  sendResponse(res, {
    success: true,
    statusCode: 200,

    message: 'student  succesfully',
    data: result,
  })
})

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body

  const result = await UserServices.createFacultyIntoDb(password, facultyData)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  })
})

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body

  const result = await UserServices.createAdminIntoDB(password, adminData)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  })
})

const getMe = catchAsync(async (req, res) => {
  // const token=req.headers.authorization

  // if (!token) {
  //    throw new  AppError(404,'token not found')
  // }

  const { userId, role } = req.user

  const result = await UserServices.getMe(userId, role)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User  is  retrieved succesfully',
    data: result,
  })
})

const userStatus = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await UserServices.changeUserStatusIntoDb(id, req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Status updated succesfull',
    data: result,
  })
})

export const UsersControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  userStatus,
}
