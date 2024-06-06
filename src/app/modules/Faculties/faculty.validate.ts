import { z } from 'zod';
import { BloodGroup, Gender } from './faculty.const';

// Enum for Gender
const GenderEnum = z.enum(['Male', 'Female', 'Other']);

// Enum for BloodGroup
const BloodGroupEnum = z.enum(['A+', 'B+', 'O+']);

// Schema for UserName
export const createuserNameValidateSchema = z.object({
  firstName: z.string().max(20, 'Name cannot be more than 20 characters'),
  middleName: z.string().optional(),
  lastName: z.string().max(20, 'Name cannot be more than 20 characters')
});

export const createUpdateuserNameValidateSchema = z.object({
    firstName: z.string().max(20, 'Name cannot be more than 20 characters').optional(),
    middleName: z.string().optional(),
    lastName: z.string().max(20, 'Name cannot be more than 20 characters').optional()
  });

// Main schema for Facultye
export const createFacultyValidateSchema = z.object({
 body:z.object({
    password:z.string(),
   faculty:z.object({
    id: z.string(),
    user: z.string(),
    designation: z.string(),
    name: createuserNameValidateSchema,
    gender:z.enum([...Gender as [string,...string[]]]),
    dateOFbirth: z.string().optional(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup:z.enum([...BloodGroup as [string, ...string[]]]),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    profileImg: z.string().optional(),
    academicDepartment: z.string(),
    isDeleted: z.boolean().default(false),
   })
 })
});

export const createUpdateFacultyValidateSchema = z.object({
    body:z.object({
       password:z.string(),
      faculty:z.object({
       id: z.string().optional(),
       user: z.string().optional(),
       designation: z.string().optional(),
       name: createuserNameValidateSchema.optional(),
       gender: GenderEnum.optional(),
       dateOFbirth: z.string().optional(),
       email: z.string().email(),
       contactNo: z.string().optional(),
       emergencyContactNo: z.string().optional(),
       bloodGroup: BloodGroupEnum.optional(),
       presentAddress: z.string().optional(),
       permanentAddress: z.string().optional(),
       profileImg: z.string().optional(),
       academicDepartment: z.string().optional(),
       isDeleted: z.boolean().default(false).optional(),
      })
    })
   });

// Export the schema
export const FacultySchema = createFacultyValidateSchema;

