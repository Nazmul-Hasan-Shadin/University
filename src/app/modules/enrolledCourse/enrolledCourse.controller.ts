import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { EnrolledCourseServices } from './enrolledCourser.services'

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId

  const result = await EnrolledCourseServices.createEnrolledCourseIntoDb(
    userId,
    req.body,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is enrolled succesfully',
    data: result,
  })
})

const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const studentId = req.user.userId
  console.log(studentId, 'iam studentit')

  const result = await EnrolledCourseServices.getMyEnrolledCoursesFromDB(
    studentId,
    req.query,
  )

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Enrolled courses are retrivied succesfully',
    meta: result.meta,
    data: result.result,
  })
})

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  console.log(req.user)
  const facultyId = req.user?.userId

  const result = await EnrolledCourseServices.updateEnrolledCourseMarkIntoDb(
    facultyId,
    req.body,
  )

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Markk is  succesfully update',
    data: result,
  })
})

export const EnrolledCourseController = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
  getMyEnrolledCourses,
}
