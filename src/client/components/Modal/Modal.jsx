import React from "react";
import "./modal.scss";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  render() {
    const { text, onClose, prompt, onSubmit } = this.props;
    return (
      <div
        className="modal"
        id="shade"
        onClick={e => (e.target.id === "shade" ? onClose() : null)}
      >
        <div className="modal_content">
          <span className="close" onClick={() => onClose()}>
            &times;
          </span>
          <p>{text}</p>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (this.state.value) {
                onSubmit(this.state.value);
                this.setState({ value: "" }, () => onClose());
              }
            }}
          >
            <input
              type="text"
              placeholder={`${prompt}...`}
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
            />
            <input
              className={`submit_button ${
                this.state.value ? null : "disabled"
              }`}
              type="submit"
              value="Add"
            />
          </form>
        </div>
      </div>
    );
  }
}
