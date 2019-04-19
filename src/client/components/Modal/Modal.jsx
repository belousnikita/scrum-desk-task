import React from "react";
import "./modal.scss";

export default class Modal extends React.Component {
  render() {
    const { text, onClose, prompt } = this.props;
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
          <form>
            <input
              type="text"
              placeholder={`${prompt}...`}
            />
            <input className="submit_button" type="submit" value="Add" />
          </form>
        </div>
      </div>
    );
  }
}
