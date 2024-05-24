import { User } from "./user.model"
import { UserServices } from "./user.services"

const createStudent = async (req: Request, res: Response) => {
    try {
      // creating a schema validation using jod
  
      const { password,student: studentData } = req.body
  
    //   const zodParseData = studentValidationSchema.parse(studentData)
  
      // const { error,value} = studentValidationSchema.validate(studentData)
  
      const result = await UserServices.createStudentIntoDb(password,studentData)
      // if (error) {
      //   res.status(200).json({
      //     success: true,
      //     message: 'something went wrong',
      //     data: error.details,
      //   })
      // }
  
      res.status(200).json({
        success: true,
        message: 'Student is created successfully',
        data: result,
      })
    } catch (error: any) {
      //  console.log(error);
  
      res.status(500).json({
        success: false,
        message: error.message || 'somethin we wrong',
        error: error,
      })
    }
  }
  