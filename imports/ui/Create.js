import React from 'react';
import { Events } from './../api/events';
import {fontawesome} from 'meteor/fortawesome:fontawesome';
import {Meteor } from 'meteor/meteor';
import {Link} from 'react-router-dom';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        error: {}
    }

    this.handleCloseBtnClick = this.handleCloseBtnClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(evt) {
    evt.preventDefault();

    let error = false;

    this.setState({error: {}});

    let title = evt.target.title.value;
    if (!title) {
      error = true;
      this.setState((prevState) => {
        let newState = prevState;
        newState.error.title = 'Title has to be filled up.';
        return newState;
      })
    }
    let description = evt.target.description.value;
    if (!description) {
      error = true;
      this.setState((prevState) => {
        let newState = prevState;
        newState.error.description = 'Description has to be filled up.';
        return newState;
      })
    }
    let date = evt.target.date.value;
    if (!date) {
      error = true;
      this.setState((prevState) => {
        let newState = prevState;
        newState.error.date = 'Date has to be filled up.';
        return newState;
      })
    }
    let time = evt.target.time.value;
    if (!time) {
      error = true;
      this.setState((prevState) => {
        let newState = prevState;
        newState.error.time = 'Time has to be filled up.';
        return newState;
      })
    }
    let capacity = evt.target.capacity.value;
    if (!capacity) {
      error = true;
      this.setState((prevState) => {
        let newState = prevState;
        newState.error.capacity = 'Capacity has to be filled up.';
        return newState;
      })
    }

    if (!error) {
      let name = this.props.user.profile.firstName + ' ' + this.props.user.profile.lastName;

      let host = this.props.user._id;

      let attendeesIds = [host];
      let attendeesNames = [name];

      let eventId;
      Events.insert({title: title, description: description,
        date: date, time: time, capacity: capacity,
        host: host, hostName: name, attendeesIds: attendeesIds, attendeesNames: attendeesNames},
        (err, id) => {
          console.log('Events.insert', id);
          Meteor.users.update({_id: host}, {$push: {'profile.attending': id}}, (err, doc) => {
            console.log('Events.insert id: ', id, ' Meteor.users.update doc: ', doc);
          })
        });
      this.props.history.push('/home');
    }


  }
  handleCloseBtnClick() {
    // console.log('Create.js handleCloseBtnClick this.props: ', this.props);
    this.props.history.goBack();
  }


  render() {
    return (
      <div className="main">
        <div className="nav">
          <Link className="logo" to="/home">E.</Link>
          <span onClick={this.handleCloseBtnClick}><i className="fa fa-close close"></i> Close</span>
        </div>
        <div className="form">
          <br/><h1>Create new event</h1>
          <p>Enter details below.</p><br/>
          <form onSubmit={this.handleSubmit} noValidate>

            <input type="text" name="title" placeholder="Title"
            style={this.state.error.title ? {borderBottomColor: 'red'} : undefined}/>
            <div className="errorText">{this.state.error.title}</div>

            <input type="text" name="description" placeholder="Description"
            style={this.state.error.description ? {borderBottomColor: 'red'} : undefined}/>
            <div className="errorText">{this.state.error.description}</div>

            <input type="date" name="date" placeholder="Date"
            style={this.state.error.date ? {borderBottomColor: 'red'} : undefined}/>
            <div className="errorText">{this.state.error.date}</div>

            <input type="time" name="time" placeholder="Time"
            style={this.state.error.time ? {borderBottomColor: 'red'} : undefined}/>
            <div className="errorText">{this.state.error.time}</div>

            <input type="number" name="capacity" placeholder="Capacity"
            style={this.state.error.capacity ? {borderBottomColor: 'red'} : undefined}/>
            <div className="errorText">{this.state.error.capacity}</div>

            <button type="submit" className="btn btn-success">Create new event</button>
        </form>
        </div>
      </div>
    )
  };
};
