import { RequestHandler } from 'express'

import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { AcademicSemisterServices } from './academicSemister.service'

const createAcademicSemister: RequestHandler = catchAsync(async (req, res) => {


  //   const { password, student: studentData } = req.body

    const result = await AcademicSemisterServices.createAcademicSemisterIntoDb(req.body)

  // res.status(200).json({
  //   success: true,
  //   message: 'Student is created successfully',
  //   data: result,
  // })

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: 'Academic semister is created successful',
  })
})
export const AcademicSemisterControllers = {
  createAcademicSemister,
}
