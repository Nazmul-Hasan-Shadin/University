import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { courseSearchableFields } from './course.const'
import { TCourse, TCourseFaculty } from './course.interface'
import { Course, CourseFaculty } from './course.model'
import { AppError } from '../../errors/appError'

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload)
  return result
}

const getAllCouresFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourse.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await courseQuery.modelQuery
  const meta = await courseQuery.countTotal()
  return {
    meta,
    result,
  }
}

const getSingleCouresFromDB = async (id: string) => {
  const result = await Course.findById(id).populate('preRequisiteCourse.course')
  return result
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourse, ...courseRemainingData } = payload
  // step 1 basic course info update
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    if (!updateBasicCourseInfo) {
      throw new AppError(400, 'Failed to update course')
    }

    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      // filterout the deleted fields
      const deletedPreRequisites = preRequisiteCourse
        .filter((element) => element.course && element.isDeleted)
        .map((el) => el.course)

      const deletedPreRequisitCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          session,
        },
      )

      if (!deletedPreRequisitCourses) {
        throw new AppError(400, 'Failed to update course')
      }

      const newPreRequisit = preRequisiteCourse?.filter(
        (el) => el.course && !el.isDeleted,
      )

      const newPreRequisteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPreRequisit } },
        },
        {
          new: true,
          session,
        },
      )
      if (!newPreRequisit) {
        throw new AppError(400, 'Failed to update course')
      }

      const result = await Course.findById(id).populate(
        'preRequisiteCourse.course',
      )
      // filter out the new course filed

      return result
    }

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(400, 'Failed to update course')
  }
}

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(id, {
    isDeleted: true,
    new: true,
  })
  return result
}

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  )
  return result
}

const getFacultiesWithCourseFromDB = async (courseId: string) => {
  const result = await CourseFaculty.findOne({ course: courseId }).populate(
    'faculties',
  )
  return result
}

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  )
  return result
}

export const CourseServices = {
  createCourseIntoDB,
  getAllCouresFromDB,
  getSingleCouresFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
  getFacultiesWithCourseFromDB,
}
