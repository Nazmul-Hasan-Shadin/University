import { RequestHandler } from 'express'

import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

import { AcademicFacultyServices } from './academicFaculty.service'

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  //   const { password, student: studentData } = req.body
  

  const result = await AcademicFacultyServices.createAcademicFacultyIntoDb(
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
    message: 'Academic Faculty is created successful',
  })
})

const getSingleAcademicFaculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDb(facultyId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty retrived successful',
    data: result,
  })
})

const getAllAcademicFaculties = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB(req.query)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'all Academic Faclty retrived successful',
    data: result,
  })
})

const updateAcademicFaculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  )

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Academic Faclty updated successful',
    data: result,
  })
})

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  getAllAcademicFaculties,
}
