import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, required: true }
});
const Task = model("Task", TaskSchema);

export default TaskSchema;
