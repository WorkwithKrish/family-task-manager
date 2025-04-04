import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin|student|parent|guest";
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "student", "parents", "guest"],
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model<IUser>("User", UserSchema);
