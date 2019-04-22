import React from "react";
import './card.scss';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.date = new Date(props.createdAt);
    this.day = this.date.getDate().toString(10);
    this.month = this.date.getMonth().toString(10);
    this.year = this.date.getFullYear().toString(10);
    this.hours = this.date.getHours().toString(10);
    this.minutes = this.date.getMinutes().toString(10);
  }
  render() {
    const { day, month, year, hours, minutes } = this;
    console.log({ day, month, year, hours, minutes });
    return (
      <div className="card">
        <button
          className="card_deleteButton"
          onClick={this.props.onDelete}
        >
          <i className="far fa-times-circle"></i>
        </button>
        <p className="card_text">
          {this.props.message}
        </p>
        <div className="card_text">
          <div className="card_date">
            <p className="card_date_time">
            {`${hours.length < 2 ? `0${hours}` : hours}:${minutes.length < 2 ? `0${minutes}` : minutes}`}</p>
            <p className="card_date_day"> 
            {`${day.lenght < 2 ? `0${day}` : day}.${month.length < 2 ? `0${month}` : month}.${year}`}</p>
          </div>
        </div>
      </div>
    );
  }
}
