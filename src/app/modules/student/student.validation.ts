import { z } from 'zod'

// Define the UserName schema
const UserNameSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name cannot exceed 20 characters')
    .nonempty('mama first name lagebeai'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .nonempty('mama last name lagebeai')
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: '{VALUE} IS NOT VkkkkkALID',
    }),
})

export const UpdateUserNameSchemaValidation = z.object({
  firstName: z
    .string()
    .max(20, 'First name cannot exceed 20 characters')
    .nonempty('mama first name lagebeai')
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .nonempty('mama last name lagebeai')
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: '{VALUE} IS NOT VkkkkkALID',
    })
    .optional(),
})
// Define the Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father name is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  fatherContactNo: z.string().nonempty('Father contact number is required'),
  motherName: z.string().nonempty('Mother name is required'),
  motherContactNo: z.string().nonempty('Mother contact number is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
})

const UpdateguardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father name is required').optional(),
  fatherOccupation: z
    .string()
    .nonempty('Father occupation is required').optional(),
  fatherContactNo:z
    .string()
    .nonempty('Father contact number is required')
    .optional(),
  motherName: z.string().nonempty('Mother name is required').optional(),
  motherContactNo: z
    .string()
    .nonempty('Mother contact number is required')
    .optional(),
  motherOccupation: z
    .string()
    .nonempty('Mother occupation is required')
    .optional(),
})

// Define the LocalGuardian schema
const localGuardianSchema = z.object({
  name: z.string().nonempty('Local guardian name is required'),
  occupation: z.string().nonempty('Local guardian occupation is required'),
  contactNo: z.string().nonempty('Local guardian contact number is required'),
  address: z.string().nonempty('Local guardian address is required'),
})

const updateLocalGuardianSchema = z.object({
  name: z.string().nonempty('Local guardian name is required').optional(),
  occupation: z
    .string()
    .nonempty('Local guardian occupation is required')
    .optional(),
  contactNo: z
    .string()
    .nonempty('Local guardian contact number is required')
    .optional(),
  address: z.string().nonempty('Local guardian address is required').optional(),
})

// Define the Student schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: UserNameSchema,

      gender: z.enum(['male', 'female', 'other'], {
        errorMap: (issue, _ctx) => {
          if (issue.code === 'invalid_enum_value') {
            return { message: '{VALUE} IS NOT REQUIRED' }
          }
          return { message: 'Gender is required' }
        },
      }),
      dateOfBirth: z.string().optional(),
      admissionSemister: z.string(),
      academicDeparment: z.string(),
      email: z
        .string()
        .email('mama email sara hobea na')
        .nonempty('Email is required bro'),
      contactNumber: z.string().nonempty('Contact number is required'),
      emergencyContactNo: z
        .string()
        .nonempty('Emergency contact number is required'),
      bloodGroup: z.enum(['A+', 'B+', 'c+']).optional(),
      presentAddress: z.string().nonempty('Present address is required'),
      permanentAddress: z.string().nonempty('Permanent address is required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianSchema,
      profileImg: z.string().nonempty('Profile image is required').optional(),
    }),
  }),
})

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: UpdateUserNameSchemaValidation,

      gender: z
        .enum(['male', 'female', 'other'], {
          errorMap: (issue, _ctx) => {
            if (issue.code === 'invalid_enum_value') {
              return { message: '{VALUE} IS NOT REQUIRED' }
            }
            return { message: 'Gender is required' }
          },
        }).optional(),
      dateOfBirth: z.string().optional(),
      admissionSemister: z.string().optional(),
      academicDeparment: z.string().optional(),
      email:z.string().email('mama email sara hobea na').optional(),
      contactNumber: z
        .string()
        .nonempty('Contact number is required')
        .optional(),
      emergencyContactNo: z
        .string()
        .nonempty('Emergency contact number is required')
        .optional(),
      bloodGroup: z.enum(['A+', 'B+', 'c+']).optional(),
      presentAddress: z
        .string()
        .nonempty('Present address is required')
        .optional(),
      permanentAddress: z
        .string()
        .nonempty('Permanent address is required')
        .optional(),
      guardian: UpdateguardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianSchema.optional(),
      profileImg: z.string().nonempty('Profile image is required').optional(),
    }),
  }),
})

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}
