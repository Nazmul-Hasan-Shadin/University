import { NextFunction, Request, RequestHandler, Response } from 'express'
import { StudentServices } from './student.service'
import catchAsync from '../../utils/catchAsync'

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB()
  res.status(200).json({
    success: true,
    message: 'Student is retrived successfully',
    data: result,
  })
})
const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const studentId = req.params.id
  const result = await StudentServices.getSingleStudentFromDb(studentId)

  res.status(200).json({
    success: true,
    message: 'Student is  successfully recieved',
    data: result,
  })
})

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await StudentServices.deleteStudentFromDb(studentId)
  res.status(200).json({
    success: true,
    message: 'Student is deleted',
    data: result,
  })
})

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
