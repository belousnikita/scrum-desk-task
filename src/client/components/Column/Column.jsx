import React from "react";
import "./column.scss";

export default class Column extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="column">
        <p className="column_title">{this.props.title}</p>
        <button
          className="column_deleteButton"
          onClick={this.props.onDelete}
        > 
          <i className="fas fa-trash"></i>
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
