import config from '../../config'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.services'

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserIntoDb(req.body)
  const { refreshToken, accessToken, needsPasswordChange } = result
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  })
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is logged in successful',
    data: {
      accessToken,
      needsPasswordChange,
    },
  })
})
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body
  console.log(passwordData, 'hki')

  const result = await AuthServices.changePassword(req.user, passwordData)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password is updated succesfully',
    data: null,
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await AuthServices.refreshToken(refreshToken)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Access token t is retrieved  successful',
    data: result,
  })
})

const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.forgetPassword(req.body.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Reset token is retrieved successfully',
    data: result,
  })
})

const resetPassword = catchAsync(async (req, res) => {
  const token= req.headers.authorization
  const result = await AuthServices.resetPassword(req.body,token)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password reset successfully',
    data: result,
  })
})

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword
}
