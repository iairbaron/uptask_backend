import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import Task, { ITask } from "./Task";

export interface IProject extends Document {
  projectName: String;
  clientName: String;
  description: String;
  tasks: PopulatedDoc<ITask & Document>[];
}

const ProjectSchema: Schema = new Schema({
  projectName: { type: String, required: true, trim: true },
  clientName: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  tasks: [
    {
        type: Types.ObjectId,
        ref: 'Task'
    }
],
});

const Project = mongoose.model("Project", ProjectSchema);

export default Project;

