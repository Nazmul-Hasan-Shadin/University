import QueryBuilder from '../../builder/QueryBuilder'
import { TAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload)
  return result
}

const getAllAcademicFacultyFromDB = async (query:Record<string,unknown>) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(),query).search(['name']).filter()
  const result= academicFacultyQuery.modelQuery
  return result
}

const getSingleAcademicFacultyFromDb = async (id: string) => {
  const result = await AcademicFaculty.findById(id)
  return result
}

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id:id }, payload, {
    new: true,
  })
  return result
}


export const AcademicFacultyServices={
  createAcademicFacultyIntoDb,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDb,
  updateAcademicFacultyIntoDB
} 