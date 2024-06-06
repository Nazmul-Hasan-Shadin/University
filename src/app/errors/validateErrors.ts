import mongoose from 'mongoose'
import { TErrorSource, TGenericErrorResponse } from '../interface/errors'





const handleValidateError = (err: mongoose.Error.ValidationError):TGenericErrorResponse => {
  const errorSource:TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidationError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      }
    },
  )

  const statusCode = 400
  return {
     
    statusCode,
    message: 'mongoose Validate Error',
    errorSource,
  }
}

export default handleValidateError
