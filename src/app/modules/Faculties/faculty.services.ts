import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { FacultySearchableFields } from './faculty.const'
import { TFaculty } from './faculty.interface'
import { Faculty } from './faculty.model'
import { AppError } from '../../errors/appError'
import { User } from '../user/user.model'

const createFacultyIntoDB = async (payload: TFaculty) => {
  const result = await Faculty.create(payload)
  return result
}

const getAllFacultyFromDB = async (query:Record<string, unknown>) => {
  const fcultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await fcultyQuery.modelQuery
 
  return result
}

const getSingleFacultyFromDb = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment')
  return result
}

const updateFacultyIntoDb = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload
  const modifiedData: Record<string, unknown> = {
    ...remainingFacultyData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value
    }
  }
  const result = await Faculty.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteFacultyFromDb = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedFaculty) {
      throw new AppError(500, 'Failed to deleted faculty')
    }

    // get user _id from deletedFaculty
    const userId = deletedFaculty.user

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    )
    if (!deletedUser) {
      throw new AppError(500, 'Failed to deleted user')
    }

    await session.commitTransaction()
    await session.endSession()
    return deletedFaculty
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }
}

export const FacultyServices = {
  createFacultyIntoDB,
  getAllFacultyFromDB,
  getSingleFacultyFromDb,
  updateFacultyIntoDb,
  deleteFacultyFromDb,
}
