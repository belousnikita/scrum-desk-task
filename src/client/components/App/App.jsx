import React from "react";
import Column from "../Column/Column.jsx";
import Card from "../Card/Card.jsx";
import Modal from "../Modal/Modal.jsx";
import "./app.scss";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      modalText: "",
      prompt: "",
      columns: [
        {
          title: "To Do"
        },
        {
          title: "In Progress"
        },
        {
          title: "Testing"
        },
        {
          title: "Done"
        }
      ]
    };
  }
  openModal(modalText, prompt) {
    this.setState({ isModal: true, modalText, prompt });
  }
  closeModal() {
    this.setState({ isModal: false });
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
