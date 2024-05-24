import { NextFunction, Request, Response } from 'express'

import { UserServices } from './user.services'
import sendResponse from '../../utils/sendResponse'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // creating a schema validation using jod
    const bodys = req.body
    console.log('iam body', bodys)

    const { password, student: studentData } = req.body
    console.log('controller', studentData)

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
  } catch (error) {
    //  console.log(error);

    next(error)
  }
}

export const UsersControllers = {
  createStudent,
}
