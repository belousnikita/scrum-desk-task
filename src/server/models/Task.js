import { Schema } from "mongoose";

const TaskSchema = new Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, required: true }
});

export default TaskSchema;
