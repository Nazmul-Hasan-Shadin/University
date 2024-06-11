import mongoose, { Schema, mongo } from 'mongoose'
import { TOfferedCourse } from './offerdCourse.interface'
import { Days } from './offeredCourse.const'

const offerdCourseSchema = new mongoose.Schema<TOfferedCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'SemesterRegistration',
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicSemester',
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicFaculty',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicFaculty',
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
  maxCapacity: {
    type: Number,
     required:true
  },
  faculty:{
   type:Schema.ObjectId,
   ref:'Faculty'
  },
  section: {
    type: Number,
    required: true,
  },
  days:[ {
    type: String,
    enum: Days,
    required:true

  }],
  startTime:{
    type:String,
    required:true
  },
  endTime:{
    type:String,
    required:true
  }
},
{
    timestamps:true
}
)



export const OfferedCourse= mongoose.model<TOfferedCourse>('OfferedCourse',offerdCourseSchema)
