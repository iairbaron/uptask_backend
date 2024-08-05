import mongoose, { Schema, Document, Types } from "mongoose";

const taskStatus = {
  PENDING: "pending",
  ON_HOLD: "onHold",
  IN_PROGESS: "inProgress",
  UNDER_REVIEW: "underReview",
  COMPLETED: "completed",
} as const;

export type taskStatus = (typeof taskStatus)[keyof typeof taskStatus];

export interface ITask extends Document {
  name: string;
  description: string;
  project: Types.ObjectId;
  status: taskStatus;
}

export const TaskSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  project: { type: Types.ObjectId, ref: "Project", required: true, trim: true },
  status: {
    type: String,
    enum: Object.values(taskStatus),
    default: taskStatus.PENDING,
  },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
