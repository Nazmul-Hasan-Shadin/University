import { USER_ROLE } from './../user/user.const';
 import express from "express"
import { FacultyControllers } from "./faculty.controller"
import validateRequest from "../../middleware/validateRequest";
import { createUpdateFacultyValidateSchema } from "./faculty.validate";
import auth from "../auth/auth";
import { USER_ROLE } from "../user/user.const";
  
 const router=express.Router()

 
 router.get('/:id',FacultyControllers.getSingleFaculty);

 router.patch('/:id',validateRequest(createUpdateFacultyValidateSchema),FacultyControllers.updateFaculty)

 router.delete('/:id',FacultyControllers.deleteFaculty);
 router.get('/', auth(USER_ROLE.admin,USER_ROLE.faculty), FacultyControllers.getAllFaculties)

 export const FacultyRoutes=router