import { TBloodGroup, TGender } from './faculty.interface'

export const Gender:TGender[] =  ['Female', 'Male', 'Other']

export const BloodGroup:TBloodGroup[] =['A+', 'B+', 'O+']
export const FacultySearchableFields = [
  'email',
  'id',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
]
