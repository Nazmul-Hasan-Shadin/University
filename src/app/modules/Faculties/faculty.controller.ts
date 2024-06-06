import { FacultyServices } from './faculty.services'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'



const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await FacultyServices.getSingleFacultyFromDb(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is retrieved succesfully',
    data: result,
  })
})

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultyFromDB(req.query)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty are retrieved succesfully',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const { faculty } = req.body
  const result = await FacultyServices.updateFacultyIntoDb(id, faculty)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is updates succesfully',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params

  
  const result = await FacultyServices.deleteFacultyFromDb(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is deleted succesfully',
    data: result,
  })
})

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
}
