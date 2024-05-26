import { z } from 'zod'
import { AcademicSemisterCode, AcademicSemisterName } from './academicSemister.constant'
import { TAcademicSemisterName } from './academicSemister.interface'

const createAcademicSemisterValidationSemister = z.object({
body:z.object({
    name:z.enum([...AcademicSemisterName] as  [string, ...string[]]),
    year:z.string(),
    code:z.enum([...AcademicSemisterCode] as [string , ...string[]]),
    startMonth:z.string(),
    endMonth:z.string()
    
})
})

export const AcademicSemisterValidations = {
  createAcademicSemisterValidationSemister,
}
