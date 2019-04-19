import React from "react";
import './card.scss';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="card">
      <button
          className="card_deleteButton"
          onClick={() => console.log("card delete")}
        >
          <i className="far fa-times-circle"></i>
        </button>
        <p className="card_text">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p>
        <p className="card_date">19.12.2019</p>
      </div>
    );
  }
}
