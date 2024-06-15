import { AppError } from '../../errors/appError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from '../../config'

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
    expiresIn: '1d',
  })

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as string,
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

const refreshToken = async (token: stringj) => {

  // if token send but worng so valid now
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload

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
    user.passwordChangeAt && User.isJwtIssuedBeforePasswordChanged(user.passwordChangeAt,iat as number)
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


  return{
    accessToken
  }





}

export const AuthServices = {
  loginUserIntoDb,
  changePassword,
  refreshToken
}
