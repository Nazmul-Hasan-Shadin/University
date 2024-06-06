import mongoose from 'mongoose'
import config from '../../config'
import { TAcademicSemister } from '../academicSemister/academicSemister.interface'
import { AcademicSemister } from '../academicSemister/academicSemister.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.models'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils'
import { AppError } from '../../errors/appError'
import { TFaculty } from '../Faculties/faculty.interface'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { Faculty } from '../Faculties/faculty.model'
import { Admin } from '../Admin/admin.model'

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

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // transiction 1
    userData.id = await generateStudentId(admissionSemester)

    //  create a user
    const newUser = await User.create([userData], { session })

    if (!newUser) {
      throw new Error('Failed to create new user')
    }

    // create student
    if (!newUser.length) {
      throw new AppError(404, 'Failed to create user')
    }
    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    // create a student (transiction1)
    const newStudent = await Student.create([payload], { session })
    if (!newStudent) {
      throw new AppError(404, 'Failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()
    return newStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession
  }
}

const createFacultyIntoDb = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_pass as string)
  userData.role = 'faculty'
  //  find academic departmanet info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  )

  if (!AcademicDepartment) {
    throw new AppError(400, 'Academic department not found')
  }

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    userData.id = await generateFacultyId()
    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new AppError(200, 'Failed to create user')
    }

    payload.id = newUser[0].id
    payload.user = newUser[0]._id
    const newFaculty = await Faculty.create([payload], { session })
    if (!newFaculty.length) {
      throw new AppError(400, 'Failed to create faculty')
    }
    await session.commitTransaction()
    await session.endSession()
    return newFaculty
  } catch (error:any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }
}


const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); 

    //create a admin
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(400, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDb,
  createFacultyIntoDb,
  createAdminIntoDB
}
