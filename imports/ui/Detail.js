import React from 'react';
import {fontawesome} from 'meteor/fortawesome:fontawesome';
import {Meteor} from 'meteor/meteor';

import {Events } from './../api/events';
import Nav from './Nav';
import GridItem from './GridItem';
import Attendees from './Attendees';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    // console.log('Inside detail constructor: this.props', this.props);
  }

  generateAttendees() {
    let event = this.state.event;
    console.log('detail.js generateattendees() this.state.event', this.state.event);
    let attendees = event.attendees.map((attendantId) => {
      let firstName = Meteor.users.find({_id: attendantId}).profile.firstName;
      let lastName = Meteor.users.find({_id: attendantId}).profile.lastName;
      let name = firstName + lastName;
      return name;
    })
    return attendees;
  }
  renderDetails() {
    if(this.props.events.length > 0) {
      console.log('detail.js renderdetails this.props.match.params', this.props.match.params);
      let id = this.props.match.params.id.slice(1);
      console.log('detail.js render id', id);
      console.log('detial.js render this.props', this.props);
      let event = this.props.events.filter((evt) => {
        if(evt._id === id) return true;
      })[0];
      console.log('Detail.js component did update: event', event);
      let attending = this.props.user.profile.attending;
      let attendeesNames = event.attendeesNames;
      // let attendees = event.attendees.map((attendantId) => {
      //   let firstName = Meteor.users.find({_id: attendantId}).profile.firstName;
      //   let lastName = Meteor.users.find({_id: attendantId}).profile.lastName;
      //   let name = firstName + ' ' + lastName;
      //   return name;
      // })
      return (
        <div className="main">
          <Nav user={this.props.user} onLogout={this.props.onLogout} match={this.props.match} history={this.props.history}/>
          <div className="section">
            <div className="header">
              <span className="eventId">Detail Event : {event._id}</span>
            </div>
            <div className="detailsSection">
              <span className='gridItemWide'>
                <GridItem
                  event={event}
                  user={this.props.user}
                  key={event._id}
                  attending={this.props.user.profile.attending}/>
              </span>
              <span className="gridItem">
                <Attendees attendeesNames={attendeesNames}/>
              </span>
            </div>
          </div>
        </div>
      )
    }
  }
  render() {
    return (
      <div>
      {typeof(this.props.match.params.id) === 'string' && this.renderDetails()}
      </div>
    )
  }
}
