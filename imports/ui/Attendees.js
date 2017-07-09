import React from 'react';

export default class Attendees extends React.Component {
  constructor(props) {
    super(props);
    this.renderAttendeesNames = this.renderAttendeesNames.bind(this);
  }
  renderAttendeesNames() {
    return this.props.attendeesNames.map((attendantName) => {
      return <span className="attendantName">{attendantName}</span>
    })
  }
  render() {
    return (
      <div className="attendees">
      <h1>Attendees</h1>
        <p>{this.renderAttendeesNames()}</p>
      </div>
    )
  }
}
