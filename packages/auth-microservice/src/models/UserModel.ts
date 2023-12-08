import mongoose, { Schema } from 'mongoose'

export interface IUser {
  username: string
  email: string
  password: string
  activationCode: string
  isActivated: boolean
  isAdmin: boolean
  isBanned: boolean
  createdAt?: Date
  activatedAt?: Date
  bannedAt?: Date
  lastLoginDate?: Date
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    activationCode: { type: String, required: true },
    isActivated: { type: Boolean, required: true, default: false },
    isAdmin: { type: Boolean, default: false },
    isBanned: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now },
    bannedAt: { type: Date },
    activatedAt: { type: Date },
    lastLoginDate: { type: Date }
  },
  {
    timestamps: true
  }
)

const UserModel = mongoose.model<IUser>('User', UserSchema)

export default UserModel
