import { Request,Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferdCourseServices } from "./offerdCourse.services";
import { OfferedCourse } from "./offerdCourse.model";
import { AppError } from "../../errors/appError";
import { SemesterRegistration } from "../semisterRegistration/semisterRegistration.model";

const createOfferedCourse=catchAsync(async(req:Request,res:Response)=>{
    const result= await OfferdCourseServices.createOfferCourseIntoDb(req.body)

    sendResponse(res,{
        statusCode:200,
        success:true,
        message:'Offered Course is created successfully',
        data:result
    })
})


const updateOfferedCourse=catchAsync(async(req:Request,res:Response)=>{
    const updateId= req.params.id
    const result= await OfferdCourseServices.updateOfferedCourseIntoDB(updateId,req.body)

    sendResponse(res,{
        statusCode:200,
        success:true,
        message:'Offered Course is uppdated successfully',
        data:result
    })
})


const deleteOfferedCourse= catchAsync(async(req:Request,res:Response)=>{
    const deletedId= req.params.id;
    const result= await OfferdCourseServices.deleteOfferCourseFromDb(deletedId)

    sendResponse(res,{
        statusCode:200,
        success:true,
        message:'Offered Course is deleted successfully',
        data:result
    })

})

const getAllOfferedCourse= catchAsync(async(req:Request,res:Response)=>{
      const query=req.query
    const result= await  OfferdCourseServices.getAllOfferedCoursesFromDB(query)
     
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:'Offered Course is deleted successfully',
        data:result
    })
})


const getSingleOfferedCourse= catchAsync(async(req:Request,res:Response)=>{
    
  const result= await  OfferdCourseServices.getSingleOfferedCourseFromDB(req.params.id)
   
  sendResponse(res,{
      statusCode:200,
      success:true,
      message:'Offered Course is deleted successfully',
      data:result
  })
})

export const OfferedCourseController={
    createOfferedCourse,
    updateOfferedCourse,
    deleteOfferedCourse,
    getAllOfferedCourse,
    getSingleOfferedCourse
}
