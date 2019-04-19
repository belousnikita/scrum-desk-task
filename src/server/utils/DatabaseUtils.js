import { model, connect } from "mongoose";
import config from '../../etc/config.json';
import "../models/Column";

const Column = model("Column");

export function setUpConnection() {
  connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, { useNewUrlParser: true });
}

export function listColumns() {
  return Column.find();
}

export function createColumn(data) {
    const column = new Column({
        title: data.title, 
        tasks: []
    })
    return column.save();
}
export function deleteColumn(id) {
    return Column.findById(id).remove();
}
