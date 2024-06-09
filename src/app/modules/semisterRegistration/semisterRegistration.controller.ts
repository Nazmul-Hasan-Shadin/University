import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { SemesterRegistrationService } from './semistrRegistration.services'

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
   
const result= await SemesterRegistrationService.createSemesterRegistrationIntoDB(req.body)

    sendResponse(res,{
        statusCode:200,
        success:true,
        message:'semister Registration is created succesfully',
        data:result
    })
  },
)

const getAllSemisterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    // sendResponse(res,{
    //     statusCode:200,
    //     success:true,
    //     message:'semister Retrived is created succesfully',
    //     data:result
    // })
  },
)

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    // sendResponse(res,{
    //     statusCode:200,
    //     success:true,
    //     message:'semister Retrived is created succesfully',
    //     data:result
    // })
  },
)

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    // sendResponse(res,{
    //     statusCode:200,
    //     success:true,
    //     message:'semister Registration is updated succesfully',
    //     data:result
    // })
  },
)

export const SemesterRegistrationController={
    updateSemesterRegistration,
    getAllSemisterRegistration,
    getSingleSemesterRegistration,
    createSemesterRegistration
}