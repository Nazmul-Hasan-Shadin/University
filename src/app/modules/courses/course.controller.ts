import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { Course } from './course.model'
import { CourseServices } from './course.services'

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  //   const { password, student: studentData } = req.body

  const result = await CourseServices.createCourseIntoDB(req.body)

  // res.status(200).json({
  //   success: true,
  //   message: 'Student is created successfully',
  //   data: result,
  // })

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: 'course  is created successful',
  })
})

const getSingleCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const result = await CourseServices.getSingleCouresFromDB(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty retrived successful',
    data: result,
  })
})

const getAllCourses = catchAsync(async (req, res, next) => {
  const result = await CourseServices.getAllCouresFromDB(req.query)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' course are  retrived successful',
    data: result,
  })
})

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CourseServices.deleteCourseFromDB(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'course is delted successful',
    data: result,
  })
})

const updateCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const result = await CourseServices.updateCourseIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Course updated successful',
    data: result,
  })
})

export const CourseController = {
  createCourse,
  getSingleCourse,
  getAllCourses,
  deleteCourse,
  updateCourse,
}
