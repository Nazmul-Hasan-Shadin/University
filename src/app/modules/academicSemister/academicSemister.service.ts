import { academicSemisterNameCodeMapper } from './academicSemister.constant'
import { TAcademicSemister } from './academicSemister.interface'
import { AcademicSemister } from './academicSemister.model'

const createAcademicSemisterIntoDb = async (payload: TAcademicSemister) => {
  if (academicSemisterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semister Code')
  }

  const result = await AcademicSemister.create(payload)
  return result
}

const getSingleAcademicSemisterFromDb = async (id: string) => {
  const result = await AcademicSemister.findById(id)
  return result
}

const getAllAcademicSemesterFromDb = async() => {
  const result = await AcademicSemister.find()
  return result;
}

const updateAcademicSemesterIntoDb = async (
  id: string,
  payload: Partial<TAcademicSemister>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemisterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester code')
  }

  const result = await AcademicSemister.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const AcademicSemisterServices = {
  createAcademicSemisterIntoDb,
  getSingleAcademicSemisterFromDb,
  updateAcademicSemesterIntoDb,
  getAllAcademicSemesterFromDb
}
