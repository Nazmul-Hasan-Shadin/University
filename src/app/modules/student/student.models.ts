import validator from 'validator'
import { Schema, model, model } from 'mongoose'
import { Guardian, LocalGuardian, Student, UserName } from './student.interface'

const UserNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'mama first name lagebeai'],
    maxlength: 20,
    validate: function (value) {
      console.log(value)
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'mama last name lagebeai'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} IS NOT VkkkkkALID',
    },
  },
})

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  motherOccupation: { type: String, required: true },
})

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
})

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: UserNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} IS NOT REQUIRED',
    },
    required: true,
  },
  dateOfBirth: String,
  email: { 
    type: String,
    required:[true,'Email is required bro'],
    unique:true,
    validate:{
      validator:(value:string)=>validator.isEmail(value),
      message:'mama email sara hobea na'
    }
  
  },
  contactNumber: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'B+', 'c+'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String, required: true },
  isActive: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active',
  },
})

export const StudentModel = model<Student>('Student', studentSchema)
