// React components
import React from "react";
import Column from "../Column/Column.jsx";
import Card from "../Card/Card.jsx";
import Modal from "../Modal/Modal.jsx";

// Store and actions
import ColumnsStore from "../../stores/ColumnsStore";
import ColumnsActions from "../../actions/ColumnsActions";

import "./app.scss";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basicColumnsCreated: false,
      creatorFunction: null,
      isModal: false,
      modalText: "",
      prompt: "",
      columns: []
    };
  }

  // Recieving state from flux api
  getStateFromFlux() {
    return {
      isLoading: ColumnsStore.isLoading(),
      columns: ColumnsStore.getColumns()
    };
  }

  // Event for store changing
  onStoreChange() {
    this.setState(this.getStateFromFlux());
  }

  // Load columns from database before mounted
  componentWillMount() {
    ColumnsActions.loadColumns();
  }

  // Setting event listener for store changing
  componentDidMount() {
    ColumnsStore.addChangeListener(this.onStoreChange.bind(this));
  }

  componentDidUpdate() {
    const { basicColumnsCreated } = this.state;
    const { columns } = this.getStateFromFlux();
    // If there is at least 1 column, basic columns won't be added
    if (columns.length > 0 && !basicColumnsCreated) {
      this.setState({ basicColumnsCreated: true });
      return;
    }
    // If there isn't any column, create basic columns
    if (!basicColumnsCreated && columns.length === 0) {
      this.setState({ basicColumnsCreated: true }, () => {
        ColumnsActions.createColumn({ title: "To Do", tasks: [] });
        ColumnsActions.createColumn({ title: "In Progress", tasks: [] });
        ColumnsActions.createColumn({ title: "Ready for testing", tasks: [] });
        ColumnsActions.createColumn({ title: "Done", tasks: [] });
      });
    }
  }

  createColumn(title) {
    ColumnsActions.createColumn({ title, tasks: [] });
  }
  addTask(columnId) {
    return message =>
      ColumnsActions.addTask(columnId, { message, date: new Date() });
  }
  // Open modal window
  openModal(modalText, prompt, creatorFunction) {
    this.setState({ isModal: true, modalText, prompt, creatorFunction });
  }
  // Close modal window
  closeModal() {
    this.setState({ isModal: false });
  }
  // Delete column by id
  deleteColumn(id) {
    ColumnsActions.deleteColumn(id);
  }
  deleteTask(columnId, taskId) {
    ColumnsActions.deleteTask(columnId, taskId);
  }
  moveTask(task) {
    const { message, createdAt } = task;
    return (fromColumnId, toColumnId) => {
      if (fromColumnId !== toColumnId) {
        ColumnsActions.deleteTask(fromColumnId, task._id);
        ColumnsActions.addTask(toColumnId, {
          message,
          date: new Date(createdAt)
        });
      }
    };
  }
  render() {
    return (
      <div className="main">
        <h2>Tasks</h2>
        <button
          className="addButton"
          onClick={() =>
            this.openModal(
              "Add a new column...",
              "Column name",
              this.createColumn.bind(this)
            )
          }
        >
          Add column
          <i className="fas fa-plus" />
        </button>

        <div className="container">
          {this.state.columns.map(c => (
            <Column
              key={c.id}
              id={c.id}
              title={c.title}
              onDelete={() => this.deleteColumn(c.id)}
              onTaskAdd={() =>
                this.openModal(
                  `Add a new task to the "${c.title}" column...`,
                  "Task",
                  this.addTask(c.id).bind(this)
                )
              }
            >
              {c.tasks.map(t => (
                <Card
                  key={t._id}
                  id={t._id}
                  parentId={c.id}
                  message={t.message}
                  createdAt={t.createdAt}
                  onDelete={() => this.deleteTask(c.id, t._id)}
                  onMove={this.moveTask(t).bind(this)}
                />
              ))}
            </Column>
          ))}
        </div>

        {this.state.isModal && (
          <Modal
            text={this.state.modalText}
            prompt={this.state.prompt}
            onSubmit={this.state.creatorFunction}
            onClose={this.closeModal.bind(this)}
          />
        )}
      </div>
    );
  }
}
