import mongoose, { Schema } from 'mongoose'
import { TSemesterRegistration } from './semisterRegistration.interface'
import { SemesterRegistrationStatus } from './semesterRegistration.const'

const semessterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>({
  academicSemester:{
    type:Schema.ObjectId,
    ref:'AcademicSemister',
    unique:true,
    required:true
  },
  status:{
    type:String,
    enum: SemesterRegistrationStatus,
    default:'UPCOMING'
  },
  startDate:{
    type:Date,
    required:true
  },
  endDate:{
    type:Date,
    required:true
  },
  minCredit:{
    type:Number,
    required:true,
    default:3
  },
  maxCredit:{
    type:Number,
    required:true,
    default:15
  }
  
},
{
    timestamps:true
})

export const SemesterRegistration = mongoose.model<TSemesterRegistration>(
  'SemesterRegistration',
  semessterRegistrationSchema,
)
