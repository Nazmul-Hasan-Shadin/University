import mongoose from 'mongoose'
import { TStudent } from './student.interface'
import { Student } from './student.models'
import { AppError } from '../../errors/appError'
import { User } from '../user/user.model'

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemister')
    .populate({
      path: 'academicDeparment',
      populate: {
        path: 'academicfaculty',
      },
    })
  return result
}

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id: id })
    .populate('admissionSemister')
    .populate({
      path: 'academicDeparment',
      populate: {
        path: 'academicfaculty',
      },
    })
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

  const result = await Student.findOneAndUpdate({ id: id }, modifiedUpdatedData,{runValidators:true})

  return result
}

const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(400, 'faild to delete student')
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
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
