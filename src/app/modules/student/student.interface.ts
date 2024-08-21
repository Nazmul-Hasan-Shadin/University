import { Model, Types } from 'mongoose';


export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string;
  user:Types.ObjectId
  password:string
  name: TUserName
  gender: 'male' | 'female' | 'other'
  dateOfBirth?: Date
  email: string
  avatar?: string
  contactNumber: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'B+' | 'c+'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImg?: string,
  admissionSemister:Types.ObjectId,
  academicDeparment: Types.ObjectId,
  academicFaculty:Types.ObjectId,
  
  isDeleted:boolean
}

// for creating static

export interface StudentModel extends Model<TStudent>{
    isUserExist(id:string):Promise<TStudent  | null>
}









// for creating instance

// export type StudentMethods = {
//   isUserExist(id:string): Promise<TStudent | null>
// }

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >
