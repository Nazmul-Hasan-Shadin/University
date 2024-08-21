import { Model } from 'mongoose'
import { USER_ROLE } from './user.const'

export interface TUser {
  id: string,
  email:string,
  password: string
  needPasswordChange: boolean,
  passwordChangeAt?:Date,
  role: 'admin' | 'student' | 'faculty' | 'superAdmin'
  isDeleted: boolean
  status: 'in-progress' | 'block'
}

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> ;
  isJwtIssuedBeforePasswordChanged(passwordChangedTime:Date,JwtIssuedTime:number):boolean
}

export type TUserRole = keyof typeof USER_ROLE
