import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  creationDate: Date;
  isActivated: boolean;
  isAdmin: boolean;
  activationCode: string;
  lastLoginDate: Date;
  isBanned: boolean;
  bannedAt: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  isActivated: { type: Boolean, required: true, default: false },
  isAdmin: { type: Boolean, default: false },
  activationCode: { type: String, required: true },
  lastLoginDate: { type: Date },
  isBanned: { type: Boolean, required: true, default: false },
  bannedAt: { type: Date },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
