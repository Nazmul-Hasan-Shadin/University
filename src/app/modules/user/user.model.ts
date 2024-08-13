import { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'
import { UserServices } from './user.services'
const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangeAt: {
      type: Date,
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

userSchema.statics.isUserExistByCustomId = async function (id: string) {
 
  return await User.findOne({ id }).select('+password')
}
userSchema.statics.isJwtIssuedBeforePasswordChanged =  function (
  passwordChangedTime: Date,
  JwtIssuedTime: number,
) {
  const passwordChangeTime = new Date(passwordChangedTime).getTime() / 1000
  console.log(passwordChangeTime > JwtIssuedTime)
  console.log(passwordChangeTime, JwtIssuedTime)

  return passwordChangeTime > JwtIssuedTime
}

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}
// query middleware

export const User = model<TUser, UserModel>('User', userSchema)
