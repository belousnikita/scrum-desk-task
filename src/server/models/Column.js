import { Schema, model } from "mongoose";

import TaskSchema from "./Task";

const ColumnSchema = new Schema({
  title: { type: String, required: true },
  tasks: { type: [TaskSchema] }
});

const Column = model("Column", ColumnSchema);

export default ColumnSchema;
