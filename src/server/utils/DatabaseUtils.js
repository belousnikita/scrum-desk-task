import { model, connect } from "mongoose";
import config from '../../etc/config.json';
import "../models/Column";
import '../models/Task';

const Column = model("Column");
const Task = model("Task");

export function setUpConnection() {
  connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, { useNewUrlParser: true });
}

export function listColumns() {
  return Column.find();
}
export function getColumn(id) {
  return Column.findById(id);
}
export function createColumn(data) {
  const column = new Column({
    title: data.title,
    tasks: []
  })
  return column.save();
}
export function addTask(columnId, taskData) {
  return Column.findByIdAndUpdate(columnId, {
    $push: {
      tasks: new Task({
        message: taskData.message,
        createdAt: taskData.date
      }
      )
    }
  });
}
export function deleteColumn(id) {
  return Column.findById(id).deleteOne();
}
