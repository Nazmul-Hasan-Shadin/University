import { Schema, model } from 'mongoose'

import { TAcademicSemister } from './academicSemister.interface'
import {
  AcademicSemisterCode,
  AcademicSemisterName,
} from './academicSemister.constant'

const academicSemisterSchema = new Schema<TAcademicSemister>(
  {
    name: {
      type: String,
      required: true,

      enum: AcademicSemisterName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    
      enum: AcademicSemisterCode,
    },

    startMonth: {
      type: String,
    },
    endMonth: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

academicSemisterSchema.pre('save', async function (next) {
  const isSemisterExist = await AcademicSemister.findOne({
    name: this.name,
    year: this.year,
  })

  if (isSemisterExist) {
    throw new Error('Semister is already exist')
  }
  next()
})

export const AcademicSemister = model<TAcademicSemister>(
  'AcademicSemister',
  academicSemisterSchema,
)
