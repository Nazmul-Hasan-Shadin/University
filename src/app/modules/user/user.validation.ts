import { z } from 'zod'
import { UserStatus } from './user.const'
import { string } from 'joi'

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .max(20, { message: 'password can not be more then 20' })
    .optional(),
})

 const userValidationChangeStatus=z.object({
    body:z.object({
      status:z.enum([...UserStatus ] as [string,...string[]])
    })
 })

export const UserValidation = {
  userValidationSchema,
  userValidationChangeStatus
}
