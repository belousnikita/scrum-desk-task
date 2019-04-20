// React components
import React from "react";
import Column from "../Column/Column.jsx";
import Card from "../Card/Card.jsx";
import Modal from "../Modal/Modal.jsx";

// Store and actions
import ColumnsStore from '../../stores/ColumnsStore';
import ColumnsActions from '../../actions/ColumnsActions';

import "./app.scss";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.getStateFromFlux());
    this.state = {
      basicColumnsCreated: false,
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
    if (columns.length > 0 && !basicColumnsCreated) {
      this.setState({ basicColumnsCreated: true });
      return;
    }
    if (!basicColumnsCreated && columns.length === 0) {

      this.setState({ basicColumnsCreated: true }, () => {
        ColumnsActions.createColumn({ title: "To Do", tasks: [] });
        ColumnsActions.createColumn({ title: "In Progress", tasks: [] });
        ColumnsActions.createColumn({ title: "Ready for testing", tasks: [] });
        ColumnsActions.createColumn({ title: "Done", tasks: [] });
      });
    }
  }

  openModal(modalText, prompt) {
    this.setState({ isModal: true, modalText, prompt });
  }

  closeModal() {
    this.setState({ isModal: false });
  }
  deleteColumn(id) {
    console.log(id);
    ColumnsActions.deleteColumn(id);
  }
  render() {
    return (
      <div className="main">
        <h2>Tasks</h2>
        <button
          className="addButton"
          onClick={() => this.openModal("Add a new column...", "Column name")}
        >
          Add column
          <i className="fas fa-plus" />
        </button>
        <div className="container">
          {this.state.columns.map((c, i) => (
            <Column
              key={i}
              title={c.title}
              onDelete={() => this.deleteColumn(c.id)}
              onTaskAdd={() =>
                this.openModal(
                  `Add a new task to the "${c.title}" column...`,
                  "Text"
                )
              }
            >
              <Card />
            </Column>
          ))}
        </div>
        {this.state.isModal && (
          <Modal
            text={this.state.modalText}
            prompt={this.state.prompt}
            onClose={this.closeModal.bind(this)}
          />
        )}
      </div>
    );
  }
}
