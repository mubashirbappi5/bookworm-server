import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  photo?: string;
}

const userSchema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  photo: String
}, { timestamps: true });

export default mongoose.model<IUser>("User", userSchema);
