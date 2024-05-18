import Joi from "joi"

  // Define the UserName schema
  const UserNameSchema = Joi.object({
    firstName: Joi.string().max(20).required().messages({
      'string.empty': 'mama first name lagebeai',
      'string.max': 'First name cannot exceed 20 characters',
      'any.required': 'mama first name lagebeai',
    }),
    middleName: Joi.string().optional(),
    lastName: Joi.string()
      .required()
      .pattern(/^[a-zA-Z]+$/)
      .messages({
        'string.empty': 'mama last name lagebeai',
        'string.pattern.base': '{VALUE} IS NOT VkkkkkALID',
        'any.required': 'mama last name lagebeai',
      }),
  })

  // Define the Guardian schema
  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required().messages({
      'string.empty': 'Father name is required',
      'any.required': 'Father name is required',
    }),
    fatherOccupation: Joi.string().required().messages({
      'string.empty': 'Father occupation is required',
      'any.required': 'Father occupation is required',
    }),
    fatherContactNo: Joi.string().required().messages({
      'string.empty': 'Father contact number is required',
      'any.required': 'Father contact number is required',
    }),
    motherName: Joi.string().required().messages({
      'string.empty': 'Mother name is required',
      'any.required': 'Mother name is required',
    }),
    motherContactNo: Joi.string().required().messages({
      'string.empty': 'Mother contact number is required',
      'any.required': 'Mother contact number is required',
    }),
    motherOccupation: Joi.string().required().messages({
      'string.empty': 'Mother occupation is required',
      'any.required': 'Mother occupation is required',
    }),
  })

  // Define the LocalGuardian schema
  const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Local guardian name is required',
      'any.required': 'Local guardian name is required',
    }),
    occupation: Joi.string().required().messages({
      'string.empty': 'Local guardian occupation is required',
      'any.required': 'Local guardian occupation is required',
    }),
    contactNo: Joi.string().required().messages({
      'string.empty': 'Local guardian contact number is required',
      'any.required': 'Local guardian contact number is required',
    }),
    address: Joi.string().required().messages({
      'string.empty': 'Local guardian address is required',
      'any.required': 'Local guardian address is required',
    }),
  })

  // Define the Student schema
  const studentValidationSchema = Joi.object({
    id: Joi.string().required().messages({
      'string.empty': 'ID is required',
      'any.required': 'ID is required',
    }),
    name: UserNameSchema.required().messages({
      'any.required': 'Name is required',
    }),
    gender: Joi.string()
      .valid('male', 'female', 'other')
      .required()
      .messages({
        'any.only': '{VALUE} IS NOT REQUIRED',
        'any.required': 'Gender is required',
      }),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required bro',
      'string.email': 'mama email sara hobea na',
      'any.required': 'Email is required bro',
    }),
    contactNumber: Joi.string().required().messages({
      'string.empty': 'Contact number is required',
      'any.required': 'Contact number is required',
    }),
    emergencyContactNo: Joi.string().required().messages({
      'string.empty': 'Emergency contact number is required',
      'any.required': 'Emergency contact number is required',
    }),
    bloodGroup: Joi.string().valid('A+', 'B+', 'c+').optional().messages({
      'any.only': 'Invalid blood group',
    }),
    presentAddress: Joi.string().required().messages({
      'string.empty': 'Present address is required',
      'any.required': 'Present address is required',
    }),
    permanentAddress: Joi.string().required().messages({
      'string.empty': 'Permanent address is required',
      'any.required': 'Permanent address is required',
    }),
    guardian: guardianValidationSchema.required().messages({
      'any.required': 'Guardian information is required',
    }),
    localGuardian: localGuardianValidationSchema.required().messages({
      'any.required': 'Local guardian information is required',
    }),
    profileImg: Joi.string().required().messages({
      'string.empty': 'Profile image is required',
      'any.required': 'Profile image is required',
    }),
    isActive: Joi.string()
      .valid('active', 'inActive')
      .default('active')
      .messages({
        'any.only': 'Invalid status',
      }),
  })

  export default studentValidationSchema
