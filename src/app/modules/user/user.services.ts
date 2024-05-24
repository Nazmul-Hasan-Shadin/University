import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.models'
import { NewUser, TUser } from './user.interface'
import { User } from './user.model'

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  // if (await Student.isUserExist(studentData.id)) {
  //   throw new Error('User already exists')
  // }

  // create a user obj
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_pass as string)

  // set  student role
  userData.role = 'student'

  // set manually; generate id
  userData.id = '203000001'
  //  create a user
  const newUser = await User.create(user) //built in statice method

  // create student
  if (Object.keys(newUser).length) {
    studentData.id=newUser.id;
    studentData.user=newUser._id  

    const newStudent= await Student.create(studentData)
  }

  // const student = new Student(studentData) //creat an instance

  //  if (await student.isUserExist(studentData.id)) {
  //    throw new Error('User already exists')
  //  }

  // const result = await student.save() //built in instance method

}

export const UserServices = {
  createStudentIntoDb,
}
