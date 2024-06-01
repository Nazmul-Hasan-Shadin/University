import mongoose from 'mongoose'
import { TErrorSource } from '../interface/errors'

const handleDuplicateError = (err: any) => {
  const match = err.message.match(/"([^"]+)"/)
  let extractedMessage
  if (match && match[1]) {
    extractedMessage = match[1]
  } else {
    console.log('No match found')
  }

  const errorSource: TErrorSource[] = [
    {
      path: '',

      message: `${extractedMessage} already exist`,
    },
  ]

  const statusCode = 400

  return {
    success: false,
    statusCode,
    message: 'Duplicate filed ',
    errorSource,
  }
}

export default handleDuplicateError
