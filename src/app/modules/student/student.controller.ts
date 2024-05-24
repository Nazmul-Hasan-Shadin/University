import { Request, Response } from 'express'
import { StudentServices } from './student.service'



// import studentValidationSchema from './student.validation'


const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'Student is retrived successfully',
      data: result,
    })
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'somethin we wrong',
      error: error,
    })
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id
    const result = await StudentServices.getSingleStudentFromDb(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is  successfully recieved',
      data: result,
    })
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'somethin we wrong',
      error: error,
    })
  }
}


const deleteStudent= async (req:Request,res:Response)=>{
  try {
    const {studentId}=req.params;
    const result= await StudentServices.deleteStudentFromDb(studentId)
    res.status(200).json({
      success:true,
      message:'Student is deleted',
      data:result
    })
  } catch (error) {
     res.status(500).json({
      success:false,
      message:error.message || 'somethin went wrong',
      error:err
     })
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent
}
