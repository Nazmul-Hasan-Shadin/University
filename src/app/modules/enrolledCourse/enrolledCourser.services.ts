import mongoose from 'mongoose'
import { AppError } from '../../errors/appError'
import { OfferedCourse } from '../offeredCourse/offerdCourse.model'
import { Student } from '../student/student.models'
import { TEnrlledCourse, TEnrollCourseMarks } from './enrolledCourse.interface'

import { SemesterRegistration } from '../semisterRegistration/semisterRegistration.model'
import { Course } from '../courses/course.model'
import { Faculty } from '../Faculties/faculty.model'
import { calculateGradeAndPoints } from './enrolledCourse.utils'
import QueryBuilder from '../../builder/QueryBuilder'
import { EnrolledCourse } from './enrolledCourse.model'

const createEnrolledCourseIntoDb = async (
  userId: string,
  payload: TEnrlledCourse,
) => {
  //  step1 check if the offered course is exist
  /** step2 check if the student is already enrolled
   *  step3 create enrolled course
   */

  const { offeredCourse } = payload
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse)

  if (!isOfferedCourseExists) {
    throw new AppError(404, 'Offered Course not found')
  }

  const course = await Course.findById(isOfferedCourseExists.course)

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(502, 'Room is full')
  }

  const student = await Student.findOne({ id: userId }).select('_id')

  const isStudentEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  })

  if (isStudentEnrolled) {
    throw new AppError(409, 'Stuednt is already  Enrolled')
  }

  // check  total credit eceed maxcredit

  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExists?.semesterRegistration,
  ).select('maxCredit')

  const maxCredits = semesterRegistration?.maxCredit

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student!._id,
      },
    },

    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },

    { $unwind: '$enrolledCourseData' },

    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ])

  const totalCredit =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0

  if (totalCredit && maxCredits && totalCredit + course?.credits > maxCredits) {
    throw new AppError(502, 'You have exceded maximun number of credits')
  }

  console.log(enrolledCourses, 'iam enrolled course')

  // total enrolled credits + new enroll course credit > maxCredit

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          offeredCourse,
          course: isOfferedCourseExists.course,
          student: student?._id,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    )

    if (!result) {
      throw new AppError(502, 'Failed to Enroll course')
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    })

    await session.commitTransaction()
    await session.endSession()

    return result
  } catch (error: any) {
    console.log(error)
  }
}

const getMyEnrolledCoursesFromDB = async (
  studentId: string,
  query: Record<string, unknown>,
) => {
  console.log('iam here', studentId)

  const student = await Student.findOne({ id: studentId })

  if (!student) {
    throw new AppError(200, 'Student not found !')
  }

  const enrolledCourseQuery = new QueryBuilder(
    EnrolledCourse.find({ student: student._id }).populate(
      'semesterRegistration academicSemester academicFaculty academicDepartment offeredCourse course student faculty',
    ),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await enrolledCourseQuery.modelQuery
  const meta = await enrolledCourseQuery.countTotal()

  return {
    meta,
    result,
  }
}

const updateEnrolledCourseMarkIntoDb = async (
  facultyId: string,
  payload: Partial<TEnrlledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload

  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration)

  if (!isSemesterRegistrationExist) {
    throw new AppError(404, 'semester registration  not found')
  }

  const isofferedCourseRegistrationExist =
    await OfferedCourse.findById(offeredCourse)

  if (!isofferedCourseRegistrationExist) {
    throw new AppError(404, 'Offered course   not found')
  }

  const isStudentExist = await Student.findById(student)

  if (!isStudentExist) {
    throw new AppError(404, 'Student    not found')
  }

  const faculty = await Faculty.findOne(
    {
      id: facultyId,
    },
    { _id: 1 },
  )

  if (!faculty) {
    throw new AppError(403, 'Faculty    not found')
  }

  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty._id,
  })

  if (!isCourseBelongToFaculty) {
    throw new AppError(403, 'Faculty    not found')
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value
    }
  }

  if (courseMarks?.finalTerm) {
    const { classTest1, classTest2, midTerm, finalTerm } =
      isCourseBelongToFaculty.courseMarks

    const totalMarks =
      Math.ceil(classTest1 * 0.1) +
      Math.ceil(midTerm * 0.3) +
      Math.ceil(classTest2 * 0.1 + Math.ceil(finalTerm * 0.5))
    const courseResult = calculateGradeAndPoints(totalMarks)

    modifiedData.grade = courseResult.grade
    modifiedData.gradePoints = courseResult.gradePoints
    modifiedData.isCompleted = true
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    modifiedData,
    {
      new: true,
    },
  )
  return result
}

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDb,
  updateEnrolledCourseMarkIntoDb,
  getMyEnrolledCoursesFromDB,
}
