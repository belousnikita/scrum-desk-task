import React from "react";
import { DropTarget } from "react-dnd";
import ItemTypes from "../../../etc/itemTypes.json";
import "./column.scss";

class Column extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const isActive = this.props.canDrop && this.props.isOver;
    return this.props.connectDropTarget(
      <div className={`column ${isActive ? "active" : null}`}>
        <p className="column_title">{this.props.title}</p>
        <button className="column_deleteButton" onClick={this.props.onDelete}>
          <i className="fas fa-trash" />
        </button>
        {this.props.children}
        <button
          className="column_addButton"
          onClick={() => this.props.onTaskAdd()}
        >
          Add a task...
        </button>
      </div>
    );
  }
}
export default DropTarget(
  ItemTypes.CARD,
  {
    drop: props => ({ id: props.id })
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)(Column);
