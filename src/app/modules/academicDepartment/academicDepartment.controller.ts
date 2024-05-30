import { RequestHandler } from 'express'

import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

import { AcademicFacultyServices } from './academicFaculty.service'
import { AcademicDepartmentServices } from './academicDepartment.services'

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    //   const { password, student: studentData } = req.body

    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDb(req.body)

    // res.status(200).json({
    //   success: true,
    //   message: 'Student is created successfully',
    //   data: result,
    // })

    sendResponse(res, {
      success: true,
      statusCode: 200,
      data: result,
      message: 'Academic Department is created successful',
    })
  },
)

const getSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDb(departmentId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department is retrived successful',
    data: result,
  })
})

const getAllAcademicDepartment = catchAsync(async (req, res, next) => {
  const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Academic Departments are retrived successful',
    data: result,
  })
})

const updateAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params
  const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
    departmentId,
    req.body,
  )

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Academic Department updated successful',
    data: result,
  })
})

export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getSingleAcademicDepartment,
    getAllAcademicDepartment,
    updateAcademicDepartment,
}
