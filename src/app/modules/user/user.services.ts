import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.models'
import { TUser } from './user.interface'
import { User } from './user.model'

const createStudentIntoDb = async (password: string, studentData:TStudent) => {
  // create a user obj

  console.log(studentData,'isamddaaaaaaaaaaaaaaaaaaaaaa');
  
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_pass as string)

  // set  student role
  userData.role = 'student'

  // set manually; generate id


  userData.id = '203000001'
  //  create a user
  const newUser = await User.create(userData)

 console.log(studentData.id,'isam');
 
  if (!newUser) {
    throw new Error('Failed to create new user')
  }

  // create student
  if (Object.keys(newUser).length) {
    
     
    studentData.id = newUser.id
    studentData.user = newUser._id

    const newStudent = await Student.create(studentData)
    console.log(newStudent);
    
  }




}

export const UserServices = {
  createStudentIntoDb,
}
