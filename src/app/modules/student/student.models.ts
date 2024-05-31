import validator from 'validator'
import { Schema, model, model } from 'mongoose'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
 
  StudentModel,
  TUserName,
} from './student.interface'

const UserNameSchema = new Schema<TUserName>({
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

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  motherOccupation: { type: String, required: true },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
})

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, 'id is required'], unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'user id is required'],
    unique: true,
    ref: 'User',
  },
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
  dateOfBirth: {type:Date},
  email: {
    type: String,
    required: [true, 'Email is required bro'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'mama email sara hobea na',
    },
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
  admissionSemister:{
    type:Schema.ObjectId,
    ref:'AcademicSemister'
  },
  academicDeparment:{
    type:Schema.Types.ObjectId,
    ref:'AcademicDepartment'
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

// pre save middleware /hook :will work on create () and save()

// post save middleware /hook

studentSchema.post('save', function (doc, next) {
  doc.password = ''

  next()
})

// query middleware

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// vartual

studentSchema.virtual('fullName').get(function () {
  return this.name.firstName + this.name.middleName + this.name.lastName
})

// create a custom static methods

studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

// creating a custom instance methode
// studentSchema.methods.isUserExist=async function(id:string){
//   const existingUser= await Student.findOne({id:id})
//   return existingUser
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
