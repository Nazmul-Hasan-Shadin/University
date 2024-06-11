import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { AppError } from '../../errors/appError'
import { AcademicSemister } from '../academicSemister/academicSemister.model'
import { RegistrationStatus } from './semesterRegistration.const'
import { TSemesterRegistration } from './semisterRegistration.interface'
import { SemesterRegistration } from './semisterRegistration.model'
import { OfferedCourse } from '../offeredCourse/offerdCourse.model'

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester
  //  check if there any registerd semester that is already 'upcoming' ori ongooing

  const isThereAnyUpComingOngoingSemister = await SemesterRegistration.findOne({
    $or: [{ status: RegistrationStatus.UPCOMING }, { status: RegistrationStatus.ONGOING }],
  })
  if (isThereAnyUpComingOngoingSemister) {
    throw new AppError(
      400,
      `There is already a ${isThereAnyUpComingOngoingSemister.status} !`,
    )
  }

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

const getAllSemisterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await semesterRegistrationQuery.modelQuery
  return result
}

const getSingleSemesterRegistrationFromDb = async (id: string) => {
  const result = await SemesterRegistration.findById(id)
  return result
}

const updateSemisterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // check if the requested regitsterd semester is exxists

  const isSemesterRegistrationExists = await SemesterRegistration.findById(id)
  const requestedStatus = payload.status

  if (!isSemesterRegistrationExists) {
    throw new AppError(400, `This semester id not found  `)
  }

  // if the requested semester registration is ended , we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists?.status

  if (currentSemesterStatus ===RegistrationStatus.ENDED) {
    throw new AppError(
      400,
      `THis semister is already ${currentSemesterStatus} `,
    )
  }
  //  upcomin g--> ongoing----> ended

  if (currentSemesterStatus === RegistrationStatus.UPCOMING && requestedStatus ===RegistrationStatus.ENDED) {
    throw new AppError(
      400,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus} `,
    )
  }

  if (currentSemesterStatus ===RegistrationStatus.ONGOING && requestedStatus === RegistrationStatus.UPCOMING) {
    throw new AppError(
      400,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus} `,
    )
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
}

const deleteSemesterRegistrationFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
    404,
      'This registered semester is not found !',
    );
  }

  // checking if the status is still "UPCOMING"
  const semesterRegistrationStatus = isSemesterRegistrationExists.status;

  if (semesterRegistrationStatus !== 'UPCOMING') {
    throw new AppError(
     404,
      `You can not update as the registered semester is ${semesterRegistrationStatus}`,
    );
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedOfferedCourse = await OfferedCourse.deleteMany(
      {
        semesterRegistration: id,
      },
      {
        session,
      },
    );

    if (!deletedOfferedCourse) {
      throw new AppError(
       400,
        'Failed to delete semester registration !',
      );
    }

    const deletedSemisterRegistration =
      await SemesterRegistration.findByIdAndDelete(id, {
        session,
        new: true,
      });

    if (!deletedSemisterRegistration) {
      throw new AppError(
      400,
        'Failed to delete semester registration !',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return null;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemisterRegistrationFromDB,
  getSingleSemesterRegistrationFromDb,
  updateSemisterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB
}
