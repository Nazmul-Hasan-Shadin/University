/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Application, NextFunction, Request, Response } from 'express'
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // setting default value
  const statusCode = err.statusCode || 500
  const message = err.message || 'something went wrong'

  type TErrorSource = {
    path: string | number
    message: string
  }
  const errorSources:TErrorSource = [
    {
      path: '',
      message: 'something went wrong',
    },
  ]

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources
  })
}

export default globalErrorHandler
