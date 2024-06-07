import QueryBuilder from '../../builder/QueryBuilder'
import { courseSearchableFields } from './course.const'
import { TCourse } from './course.interface'
import { Course } from './course.model'

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
  return result
}

const getSingleCouresFromDB = async (id: string) => {
  const result = await Course.findById(id).populate('preRequisiteCourse.course')
  return result
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourse, ...courseRemainingData } = payload
  // step 1 basic course info update

  const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
    },
  )
  if (preRequisiteCourse && preRequisiteCourse.length > 0) {
    // filterout the deleted fields
    const deletedPreRequisites = preRequisiteCourse
      .filter((element) => element.course && element.isDeleted)
      .map((el) => el.course)

      const deletedPreRequisitCourses = await Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourse: { course: { $in: deletedPreRequisites } } },
    })

    const newPreRequisit = preRequisiteCourse?.filter(
      (el) => el.course && !el.isDeleted,
    )

    const newPreRequisteCourse = await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourse: { $each: newPreRequisit } },
    })
   
  }

  const result= await Course.findById(id).populate('preRequisiteCourse.course')
  // filter out the new course filed

 return result
}

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(id, {
    isDeleted: true,
    new: true,
  })
  return result
}

export const CourseServices = {
  createCourseIntoDB,
  getAllCouresFromDB,
  getSingleCouresFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
}
