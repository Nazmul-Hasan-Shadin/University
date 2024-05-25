import { NextFunction, Request, RequestHandler, Response } from 'express'
import { StudentServices } from './student.service'

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err))
  }
}

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB()
  res.status(200).json({
    success: true,
    message: 'Student is retrived successfully',
    data: result,
  })
})
const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const studentId = req.params.id
  const result = await StudentServices.getSingleStudentFromDb(studentId)

  res.status(200).json({
    success: true,
    message: 'Student is  successfully recieved',
    data: result,
  })
})

const deleteStudent: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.deleteStudentFromDb(studentId)
    res.status(200).json({
      success: true,
      message: 'Student is deleted',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
