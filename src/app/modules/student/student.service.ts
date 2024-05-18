import { TStudent } from './student.interface'
import { Student } from './student.models'

const createStudentIntoDb = async (studentData: TStudent) => {
  if (await Student.isUserExist(studentData.id)) {
    throw new Error('User already exists')
  }
  const result = await Student.create(studentData) //built in statice method

  // const student = new Student(studentData) //creat an instance

  //  if (await student.isUserExist(studentData.id)) {
  //    throw new Error('User already exists')
  //  }

  // const result = await student.save() //built in instance method

  return result
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id: id })
  return result
}

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({id},{
    isDeleted:true
  })
  return result
}


export const StudentServices = {
  createStudentIntoDb,
  getAllStudentsFromDB,
  deleteStudentFromDb,
  getSingleStudentFromDb,
}
