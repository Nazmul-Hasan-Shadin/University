import { AppError } from '../../errors/appError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from '../../config'
import { sendEmail } from '../../utils/sendMailer'
import { decode } from 'punycode'
import { verifyToken } from './auth.utils'

const loginUserIntoDb = async (payload: TLoginUser) => {
  const user = await User.isUserExistByCustomId(payload.id)
  console.log(user)

  if (!user) {
    throw new AppError(404, 'This user is not found ')
  }

  const isDeleted = user?.isDeleted
  if (isDeleted) {
    throw new AppError(404, 'This user is Deleted! ')
  }

  // checking if the password is correct

  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(404, 'password donnot password ')
  }

  //   checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'block') {
    throw new AppError(400, 'This user is blocked')
  }

  //  create token and sent to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '6m',
  })

  const refreshToken = jwt.sign(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    { expiresIn: '365d' },
  )

  return {
    accessToken,
    needsPasswordChange: user?.needPasswordChange,
    refreshToken,
  }
}

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistByCustomId(userData.userId)
  console.log(user)

  if (!user) {
    throw new AppError(404, 'This user is not found ')
  }

  const isDeleted = user?.isDeleted
  if (isDeleted) {
    throw new AppError(404, 'This user is Deleted! ')
  }

  // checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user.password))) {
    throw new AppError(404, 'password donnot match ')
  }

  //   checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'block') {
    throw new AppError(400, 'This user is blocked')
  }

  // hash new password

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  )

  const result = await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  )
  return null
}

const refreshToken = async (token: string) => {
  // if token send but worng so valid now
  const decoded = verifyToken(token, config.JWT_REFRESH_SECRET as string)

  const { role, userId, iat } = decoded

  const user = await User.isUserExistByCustomId(userId)

  const userStatus = user?.status

  if (!user) {
    throw new AppError(404, 'This user is not found ')
  }

  const isDeleted = user?.isDeleted
  if (isDeleted) {
    throw new AppError(404, 'This user is Deleted! ')
  }
  if (userStatus === 'block') {
    throw new AppError(400, 'This user is blocked')
  }

  if (
    user.passwordChangeAt &&
    User.isJwtIssuedBeforePasswordChanged(user.passwordChangeAt, iat as number)
  ) {
    throw new AppError(402, 'Your are not authorize token')
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '1d',
  })

  return {
    accessToken,
  }
}

const forgetPassword = async (id: string) => {
  const user = await User.isUserExistByCustomId(id)

  const userStatus = user?.status

  if (!user) {
    throw new AppError(404, 'This user is not found ')
  }

  const isDeleted = user?.isDeleted
  if (isDeleted) {
    throw new AppError(404, 'This user is Deleted! ')
  }
  if (userStatus === 'block') {
    throw new AppError(400, 'This user is blocked')
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const resetToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10m',
  })

  const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken}`
  console.log(resetUILink)

  sendEmail(user?.email, resetUILink)
}

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  console.log(payload.id)

  const user = await User.isUserExistByCustomId(payload.id)
  console.log(user)

  if (!user) {
    throw new AppError(404, 'This user is not found ')
  }

  const isDeleted = user?.isDeleted
  if (isDeleted) {
    throw new AppError(404, 'This user is Deleted! ')
  }

  // checking if the password is correct

  // if (!(await User.isPasswordMatched(payload.newPassword, user.password))) {
  //   throw new AppError(404, 'password donnot password ')
  // }

  //   checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'block') {
    throw new AppError(400, 'This user is blocked')
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload
  console.log('decoded id', decoded.userId)

  if (payload.id !== decoded.userId) {
    throw new AppError(401, 'Your are forbidden')
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  )
  const result = await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,

      passwordChangeAt: new Date(),
    },
  )
}

export const AuthServices = {
  loginUserIntoDb,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
}
