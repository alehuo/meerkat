import mongoose, { Document } from 'mongoose'
import * as t from 'io-ts'

export const UserModel = t.type({
  email: t.string
})

export type IUserModel = t.TypeOf<typeof UserModel>

export type IUser = IUserModel & Document

const userSchema = new mongoose.Schema<IUserModel>({
  email: { type: String, required: true, unique: true }
})

export const User = mongoose.model<IUser>('User', userSchema)
