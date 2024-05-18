import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import Joi from 'joi'
import studentValidationSchema from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using joi

    const { student: studentData } = req.body

    const { error } = studentValidationSchema.validate(studentData)

    const result = await StudentServices.createStudentIntoDb(studentData)
    if (error) {
      res.status(200).json({
        success: true,
        message: 'something went wrong',
        data: error.details,
      })
    }

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (error) {
    //  console.log(error);

    res.status(500).json({
      success: false,
      // error: 'somethin went wrong',
      data: error,
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'Student is retrived successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id
    const result = await StudentServices.getSingleStudentFromDb(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is  successfully recieved',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
