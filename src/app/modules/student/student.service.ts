import mongoose from 'mongoose'
import { TStudent } from './student.interface'
import { Student } from './student.models'
import { AppError } from '../../errors/appError'
import { User } from '../user/user.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { studentSearchableField } from './student.constant'

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // for search  {email:{$regex:query.searchTerm, $option:i}}

  // fro multiple field search query we need to map of these field
  // const excludes = ['searchTerm', 'sort','limit','page','fields']
  // let searchTerm = ''

  // const queryObj = { ...query }
  // excludes.forEach((el) => delete queryObj[el])
  // console.log(queryObj, 'hi')
  // const studentSearchableField = ['email', 'name.firstName', 'presentAddress']
  // const searchQuery = Student.find({
  //   $or: studentSearchableField.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string
  // }
  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemister')
  //   .populate({
  //     path: 'academicDeparment',
  //     populate: {
  //       path: 'academicfaculty',
  //     },
  //   })
  //   let sort = '-createdAt'
  //   if (query?.sort) {
  //     sort = query.sort as string
  //   }
  // const sortQuery = filterQuery.sort(sort)
  // let limit = 1
  // let page = 1
  // let skip = 0

  // if (query?.limit) {
  //   limit = Number(query.limit)
  // }
  // if (query.page) {
  //   page = Number(query.page)
  //   skip = (page - 1)*limit
  // }
  // const paginateQuery = sortQuery.skip(skip)
  // const limitQuery =paginateQuery.limit(limit)

  //field limiting

  //  let fields='-__v';
  //  if (query.fields) {
  //     fields=(query.fields as string).split(',').join(' ')
  //     console.log(fields);

  //  }

  //  const fieldsQuery = await limitQuery.select(fields)

  //   return fieldsQuery

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemister')
      .populate('academicDeparment academicFaculty'),
    query,
  )
    .search(studentSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery
  const meta = await studentQuery.countTotal()

  return {
    meta,
    result,
  }
}

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemister')
    .populate('academicFaculty academicDepartment')
  return result
}

const updateStudentIntoDb = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remaininStudentgData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remaininStudentgData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    runValidators: true,
  })

  return result
}

const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deletedStudent = await Student.findByIdAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(400, 'faild to delete student')
    }

    const userId = deletedStudent.user
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      {
        isDeleted: true,
      },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(400, 'faild to delete user')
    }

    await session.commitTransaction()
    await session.endSession()
    return deletedStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }
}

export const StudentServices = {
  getAllStudentsFromDB,
  deleteStudentFromDb,
  getSingleStudentFromDb,
  updateStudentIntoDb,
}
