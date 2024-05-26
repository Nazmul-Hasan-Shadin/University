import { Schema, model } from 'mongoose'

import {
  TAcademicSemister,
} from './academicSemister.interface'
import { AcademicSemisterCode, AcademicSemisterName } from './academicSemister.constant'


const academicSemisterSchema = new Schema<TAcademicSemister>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: AcademicSemisterName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
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

export const AcademicSemister = model<TAcademicSemister>(
  'AcademicSemister',
  academicSemisterSchema,
)
