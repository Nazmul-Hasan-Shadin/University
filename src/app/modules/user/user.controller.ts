import { RequestHandler } from 'express'

import { UserServices } from './user.services'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  // creating a schema validation using jod

  const { password, student: studentData } = req.body

  const result = await UserServices.createStudentIntoDb(password, studentData)

  // res.status(200).json({
  //   success: true,
  //   message: 'Student is created successfully',
  //   data: result,
  // })

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: 'student created succesfully',
  })
})


const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty:facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDb(password, facultyData);

  sendResponse(res, {
    statusCode:200,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode:200,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});



export const UsersControllers = {
  createStudent,
  createFaculty,
  createAdmin
}
