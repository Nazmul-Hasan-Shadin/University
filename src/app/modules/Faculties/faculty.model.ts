import { Schema, model } from 'mongoose'
import { FacultyModel, TFaculty, TUserName } from './faculty.interface'
import { BloodGroup, Gender } from './faculty.const'

const userNameSchema = new Schema<TUserName>({
  firstName: {
   type:String,
    required: [true, 'Frist name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 character'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
})

const facultySchema = new Schema<TFaculty, FacultyModel>({
  id: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
  },
  user: {
    type: Schema.ObjectId,
    required: [true, 'user id is required'],
    ref: 'User',
    unique: true,
  },
  designation: {
    type: String,
    required: [true, 'Designation is required'],
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: Gender,
      message: '{VALUE} is not a valid gender',
    },
    required: [true, 'Gender is required'],
  },
  dateOFbirth: { type: String },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  contactNo: { type: String, required: [true, 'Contact number is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup:{
    type:String,
    enum:{
        values:BloodGroup
    },
    message:`{VALUE} IS NOT VALID BLOOD GROUP`
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  profileImg: { type: String },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: [true, 'academic department id is required'],
    ref: 'User',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },


},{
    toJSON:{
        virtuals:true
    }
})


// generate full name using vartual 

facultySchema.virtual('fullName').get(function(){
    return(
        this?.name?.firstName + '' + this?.name?.middleName + ' ' + this?.name?.lastName
    )
})


// filter out deleted doucmetns
facultySchema.pre('find',function(){
    this.find({isDeleted:{$ne:true}})
})
facultySchema.pre('findOne',function(){
    this.find({isDeleted:{$ne:true}})
})


// checking if user is already exists

facultySchema.statics.isUserExists= async function (id:string){
 const existingUser=await Faculty.findOne({id})
 return existingUser
}

export const Faculty=model<TFaculty,FacultyModel>('Faculty',facultySchema)