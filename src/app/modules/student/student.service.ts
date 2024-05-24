import { TStudent } from './student.interface'
import { Student } from './student.models'



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

  getAllStudentsFromDB,
  deleteStudentFromDb,
  getSingleStudentFromDb,
}
