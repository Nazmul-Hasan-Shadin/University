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

const updateStudent: RequestHandler =catchAsync(async (req, res) => {
   console.log(req.body,'iambdojffffffffffffffffff')
  const { studentId } = req.params
  console.log(studentId)

  const { student } = req.body
  // console.log(req.body,'iam body');

  const result = await StudentServices.updateStudentIntoDb(studentId, student)
  res.status(200).json({
    success: true,
    message: 'Student is updated',
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
  updateStudent,
}
