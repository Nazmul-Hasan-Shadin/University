import { AppError } from '../../errors/appError'
import { AcademicSemister } from '../academicSemister/academicSemister.model'
import { TSemesterRegistration } from './semisterRegistration.interface'
import { SemesterRegistration } from './semisterRegistration.model'

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester

  // check if the semester is exist
  const isAcademicSemesterExists =
    await AcademicSemister.findById(academicSemester)

  if (!isAcademicSemesterExists) {
    throw new AppError(404, 'This academicSemister not found!')
  }

  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester: academicSemester,
  })

  if (isSemesterRegistrationExist) {
    throw new AppError(400, 'This academicSemister is already register!')
  }

  const result = await SemesterRegistration.create(payload)
  return result
}

const getAllSemisterRegistrationFromDB = async () => {}

const getSingleSemesterRegistrationFromDb = async () => {}

const updateSemisterRegistrationIntoDB = async () => {}

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemisterRegistrationFromDB,
  getSingleSemesterRegistrationFromDb,
  updateSemisterRegistrationIntoDB,
}
