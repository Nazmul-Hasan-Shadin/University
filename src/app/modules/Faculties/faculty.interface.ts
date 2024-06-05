import { extend } from "joi";
import { Date, Model, Types } from "mongoose"

export type TUserName={
    firstName:string;
    middleName:string;
    lastName:string;
}

export type TGender= 'male' | 'female' | 'other'
export type TBloodGroup= 'A+' | 'B+' | 'B-' | 'O+'

export type TFaculty={
    id:string;
    user:Types.ObjectId;
    designation:string;
    name:TUserName;
    profileImg:string;
    gender:TGender,
    dateOFbirth?:Date;
    email:string;
    presentAddress:string;
    contactNo:string;
    emergencyContactNo:string;
    bloodGroup?:string;
    permanentAddress:string;
    profileImage?:string;
    academicDepartment:Types.ObjectId;
    isDeleted:boolean
}

export interface FacultyModel extends Model<TFaculty>{
    isUserExists(id:string):Promise<TFaculty | null>;
}