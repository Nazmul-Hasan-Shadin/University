import { RequestHandler } from 'express'

import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { AcademicSemisterServices } from './academicSemister.service'

const createAcademicSemister: RequestHandler = catchAsync(async (req, res) => {
  //   const { password, student: studentData } = req.body

  const result = await AcademicSemisterServices.createAcademicSemisterIntoDb(
    req.body,
  )

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

const getSingleAcademicSemister = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params
  const result =
    await AcademicSemisterServices.getSingleAcademicSemisterFromDb(semesterId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semester retrived successful',
    data: result,
  })
})

const getAllAcademicSemister = catchAsync(async (req, res, next) => {
  const result = await AcademicSemisterServices.getAllAcademicSemesterFromDb()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'all Academic semester retrived successful',
    data:result,
  })
})

const updateAcademicSemister = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params
  const result = await AcademicSemisterServices.updateAcademicSemesterIntoDb(
    semesterId,
    req.body,
  )

  return result
})

export const AcademicSemisterControllers = {
  createAcademicSemister,
  getSingleAcademicSemister,
  updateAcademicSemister,
  getAllAcademicSemister,
}
