import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role:{
    type :String,
    },
    password: {
      type: String,
      required: true,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ['blocked', 'in-progress'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  // hashing password and save into db

  const user = this

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  )

  next()
})

// post save middleware /hook

userSchema.post('save', function (doc, next) {
  doc.password = ''

  next()
})

// query middleware

export const User = model<TUser>('User', userSchema)
