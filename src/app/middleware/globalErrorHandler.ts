/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Application, NextFunction, Request, Response } from 'express'
import { ZodError, ZodIssue, ZodIssueBase } from 'zod'
import { TErrorSource } from '../interface/errors'
import handlezodError from '../errors/handleZodErrors'
import handleValidateError from '../errors/validateErrors'
import handleCastError from '../errors/handleCastError'
import handleDuplicateError from '../errors/handleDuplicateError'
import { AppError } from '../errors/appError'
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // setting default value
  let statusCode = err.statusCode || 500
  let message = err.message || 'something went wrong'

  let errorSources: TErrorSource[] = [
    {
      path: '',
      message: 'something went wrong',
    },
  ]

  if (err instanceof ZodError) {
    const simplifiedError = handlezodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSource
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError.errorSource
  } else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError.errorSource
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError.errorSource
  }
  else if (err instanceof AppError) {
  
    statusCode = err?.statusCode
    message = err.message
    errorSources = [{
      path:'',
      message:err.message
    }]
  }
   

  return res.status(statusCode).json({
    success: false,
    message,

    errorSources,
  })
}

export default globalErrorHandler
