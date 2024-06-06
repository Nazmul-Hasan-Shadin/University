 import express from "express"
import { FacultyControllers } from "./faculty.controller"
import validateRequest from "../../middleware/validateRequest";
import { createUpdateFacultyValidateSchema } from "./faculty.validate";
  
 const router=express.Router()

 
 router.get('/:id',FacultyControllers.getSingleFaculty);

 router.patch('/:id',validateRequest(createUpdateFacultyValidateSchema),FacultyControllers.updateFaculty)

 router.delete('/:id',FacultyControllers.deleteFaculty);
 router.get('/',FacultyControllers.getAllFaculties)

 export const FacultyRoutes=router