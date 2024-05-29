import config from '../../config'
import { TAcademicSemister } from '../academicSemister/academicSemister.interface'
import { AcademicSemister } from '../academicSemister/academicSemister.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.models'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'

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

  userData.id = await generateStudentId(admissionSemester)

  //  create a user
  const newUser = await User.create(userData)

  if (!newUser) {
    throw new Error('Failed to create new user')
  }

  // create student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id
    payload.user = newUser._id

    const newStudent = await Student.create(payload)
    console.log(newStudent)
  }
}

export const UserServices = {
  createStudentIntoDb,
}
