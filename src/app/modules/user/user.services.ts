import mongoose from 'mongoose'
import config from '../../config'
import { TAcademicSemister } from '../academicSemister/academicSemister.interface'
import { AcademicSemister } from '../academicSemister/academicSemister.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.models'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import { AppError } from '../../errors/appError'

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  // create a user obj

  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_pass as string)

  // set  student role
  userData.role = 'student'

  // set manually; generate id

  //  year ,semisterCode 4 digit number

  const admissionSemester = await AcademicSemister.findById(
    payload.admissionSemister,
  )

   const session=await mongoose.startSession()

  try {
     session.startTransaction()
    // transiction 1
    userData.id = await generateStudentId(admissionSemester)

    //  create a user
    const newUser = await User.create([userData],{session})
  
    if (!newUser) {
      throw new Error('Failed to create new user')
    }
  
    // create student
    if (!newUser.length) {
       throw new AppError(404,'Failed to create user')
    }
    payload.id = newUser[0].id
    payload.user = newUser[0]._id
       
    // create a student (transiction1)
    const newStudent = await Student.create([payload],{session})
    if (!newStudent) {
      throw new AppError(404,'Failed to create student')
    }
     
    await session.commitTransaction()
    await session.endSession()
    return newStudent
  }
  
   catch (error) {
     await session.abortTransaction()
     await session.endSession


  }
}


 
export const UserServices = {
  createStudentIntoDb
}
