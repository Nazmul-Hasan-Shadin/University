import { NextFunction, Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { AppError } from '../../errors/appError'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import { extend } from 'joi'
import { TUserRole } from '../user/user.interface'
import { User } from '../user/user.model'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // validation

    const token = req.headers.authorization
    if (!token) {
      throw new AppError(400, 'YOur are not authorized')
    }

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

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(403, 'You are not authorzed')
    }

    req.user = decoded as JwtPayload

    // if the token is sent from the client
    next()
  })
}

export default auth
