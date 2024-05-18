import { Model } from 'mongoose';


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
  id: string
  password:string
  name: TUserName
  gender: 'male' | 'female' | 'other'
  dateOfBirth?: string
  email: string
  avatar?: string
  contactNumber: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'B+' | 'c+'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImg?: string
  isActive: 'active' | 'inActive'
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
