import React from 'react';
import {fontawesome} from 'meteor/fortawesome:fontawesome';
import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import Nav from './Nav';
import {Events} from './../api/events';
import Attendees from './Attendees';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);

    console.log('constructor', this.props);

    this.renderEdit = this.renderEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.handleChange = this.handleChange.bind(this)


  }



  componentWillMount() {
    console.log('componentWillMount', this.props);
    if(this.props.events.length > 0 && this.props.user) {
      let id = this.props.match.params.id.slice(1);

      let event2 = this.props.events.filter((evt) => {
        if(evt._id === id) return true;
      })[0];

      this.setState({
        event2
      })
    }
  }


  componentDidUpdate() {
    if(this.props.user && !this.state) {

      let id = this.props.match.params.id.slice(1);

      let event2 = this.props.events.filter((evt) => {
        if(evt._id === id) return true;
      })[0];
      this.setState({event2: event2})
    }
  }

  handleSubmit(evt) {
    console.log('handlesubmit this.state', this.state);
    evt.preventDefault();

    let title = evt.target.title.value;
    let description = evt.target.description.value;
    let date = evt.target.date.value;
    let time = evt.target.time.value;
    let capacity = evt.target.capacity.value;
    let host = this.props.user._id;

    console.log('this.state', this.state);
    let id = this.state.event2._id;
    console.log(title, description, date, id);
    Events.update({_id: id}, {$set: { title: title, description: description,
      date: date, time: time, capacity: capacity }}, (err, doc) => {
        console.log('Events.update err, doc', err, doc);
      });
    this.props.history.push('/home');
  }
  handleDeleteEvent() {
    let id = this.state.event2._id;
    Events.remove({
      _id: id
    }), (err, doc) => {
      console.log('remove err, doc', err, doc);
    };
    this.props.history.push('/home');
  }
  handleChange(evt) {
    let field = evt.target.name;
    let value = evt.target.value;
    this.setState((prevState) => {
      let newState = prevState;
      newState.event2[field] = value;
      return newState;
    })
  }
  renderValue(evt) {
    console.log('renderValue evt', evt);
    return "Hello!";
  }
  renderEdit() {
    console.log('renderEdit fired', this.state);
    if(this.state && this.state.event2 && this.props.user) {

      // let event = this.props.events.filter((evt) => {
      //   if(evt._id === this.state.id) return true;
      // })[0];
      //
      // console.log('edit.js renderdetails this.props.match.params', this.props.match.params);
      //

      //find event by id

      let id = this.props.match.params.id.slice(1);

      let event2 = this.props.events.filter((evt) => {
        if(evt._id === id) return true;
      })[0];


      console.log('edit.js render this.props', this.props);
      //
      // console.log('edit.js component did update: event', event);
      let attending = this.props.user.profile.attending;
      let attendeesNames = event2.attendeesNames;

      let loading = true;
      if (this.state && this.state.event2) {
        loading = false;
      }

      let title = "";
      let description = "";
      let date = "";
      let time = "";
      let capacity = "";

      if (this.state && this.state.event2) {
        title = this.state.event2.title;
        description = this.state.event2.description;
        date = this.state.event2.date;
        time = this.state.event2.time;
        capacity = this.state.event2.capacity;
      }

      return (
        <div className="main">
          <Nav user={this.props.user} onLogout={this.props.onLogout} match={this.props.match} history={this.props.history}/>
          <div className="section">
            <div className="header">
              <span className="eventId">Detail Event: {this.state.event2._id}</span>
              <span className="deleteEvent"
                  onClick={this.handleDeleteEvent}><i className="fa fa-trash"></i> Delete Event</span>
            </div>
            <div className="detailsSection">
              <span className="editForm">
                <form onSubmit={this.handleSubmit} noValidate className='editContent'>
                  <label>Title <br/>
                  <input id="title" type="text" onChange={this.handleChange} name="title" value={this.state.event2.title} /> </label>
                    <label>Description <br/>
                  <input id="`description`" type="text" onChange={this.handleChange} name="description" value={this.state.event2.description} /></label>
                    <label>Date <br/>
                  <input id="date" type="date" onChange={this.handleChange} name="date" value={this.state.event2.date} /></label>
                    <label>Time <br/>
                  <input id="time" type="time" onChange={this.handleChange} name="time" value={this.state.event2.time} /></label>
                    <label>Capacity <br/>
                  <input id="capacity" type="number" onChange={this.handleChange} name="capacity" value={this.state.event2.capacity} /></label>
                  <button type="submit" className="btn-submit"><i className="fa fa-check"></i></button>
                </form>
              </span>
              <span className="gridItem" style={{height:'440px'}}>
                <Attendees attendeesNames={attendeesNames}/>
              </span>
            </div>
          </div>
      </div>
      )
    }
  }
  render() {
    console.log('render fired', this.props);
    return (
      <div>
        {this.renderEdit()}
      </div>
    )
  }
}
