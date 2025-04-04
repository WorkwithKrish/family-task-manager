import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  assignedTo: mongoose.Schema.Types.ObjectId;
  assignedBy: mongoose.Schema.Types.ObjectId;

  status: any;
  image: any;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "completed"],
      default: "open",
    },
    image: { type: String }, // Optional image upload
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
