import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'

// import studentValidationSchema from './student.validation'

const getAllStudents = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'Student is retrived successfully',
      data: result,
    })
  } catch (error) {
      next(error)
  }
}

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.id
    const result = await StudentServices.getSingleStudentFromDb(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is  successfully recieved',
      data: result,
    })
  } catch (error) {
      next(error)
  }
}

const deleteStudent = async (req: Request, res: Response,next:NextFunction) => {
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
