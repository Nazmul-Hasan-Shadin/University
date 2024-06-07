import { Schema, Types, model } from 'mongoose'
import { TCourse, TPreRequisteCoursel } from './course.interface'

const preRequisiteCoursesSchema = new Schema<TPreRequisteCoursel>({
  course: {
    type: Schema.Types.ObjectId,
    ref:'Course'
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourse: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  }
})


export const Course= model<TCourse>('Course',courseSchema)