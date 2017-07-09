import React from 'react';
import { Link } from 'react-router-dom'; //for Create event button
import { Meteor } from 'meteor/meteor';
import { fontawesome } from 'meteor/fortawesome:fontawesome';

import GridItem from './GridItem';
import ListItem from './ListItem';
import Nav from './Nav';

export default class Home extends React.Component {
  constructor(props) {
    super(props);


    this.renderHome = this.renderHome.bind(this);
    this.renderEvents = this.renderEvents.bind(this);

    this.handleItemClick = this.handleItemClick.bind(this);
  }
  // componentDidMount() {
  //   console.log('Home.js componentDidMount this.props', this.props);
  // }
  renderHome() {
    if(!this.props.events) {
      return this.renderSpinner();
    } else {
      return this.renderEvents();
    }
  }
  renderSpinner() {
    console.log('Home.js renderSpiner() fired');
    var options = {
      lines: 7, // The number of lines to draw
      length: 10, // The length of each line
      width: 3, // The line thickness
      radius: 20, // The radius of the inner circle
      corners: 0.7, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#fff', // #rgb or #rrggbb
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: true, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: 'auto', // Top position relative to parent in px
      left: 'auto' // Left position relative to parent in px
    };
    var target = document.getElementById('spinner');
    var spinner = new Spinner(options).spin(target);
  }
  handleItemClick(event) {
    let id = event._id;
    // console.log('Home.js handleItemClick id', id);
    let url = '/detail:' + id;

    //redirects to detial of event
    this.props.history.push(url);
  }
  renderEvents() {
    console.log('Home.js renderEvents() this.props', this.props);
    return (
      //loops through all public events
      this.props.events.map((event) => {

        let currentDate = new Date();
        let eventDate = new Date(event.date);

        //for user experience, if eventDate === currentDate, the event will display in both past and future events

        if(
          (+eventDate <= +currentDate && this.props.filterEvents === 'past') ||
        (+eventDate >= +currentDate && this.props.filterEvents === 'future') ||
        (this.props.filterEvents === 'all')) {

          if(this.props.view === 'grid') {
            return (
              <div className='gridItem' onClick={() => this.handleItemClick(event)}>
                <GridItem
                  event={event}
                  user={this.props.user}
                  key={event._id}
                  attending={this.props.user.profile.attending}/>
              </div>
            )
          } else if(this.props.view === 'list') {
            return (
              <div className='listItem' onClick={() => this.handleItemClick(event)}>
                <ListItem
                  event={event}
                  user={this.props.user}
                  key={event._id}
                  attending={this.props.user.profile.attending}/>
              </div>
            )
          }
        }
      })
    )
  }
  render() {
    return (
      <div className="main">
      <Nav user={this.props.user} onLogout={this.props.onLogout} match={this.props.match} history={this.props.history}/>
      <div className="section">
        <div className="header">
          <span>
            <span className="filterEventsPC">
              <button style={ this.props.filterEvents === 'all' ? {color: 'black'} : {color: '#cccccc'}}
                name="all" className="btn btn-filter" onClick={this.props.handleFilterBtnClickPC}>All events</button>
              <button style={ this.props.filterEvents === 'future' ? {color: 'black'} : {color: '#cccccc'}}
                name="future" className="btn btn-filter" onClick={this.props.handleFilterBtnClickPC}>Future events</button>
              <button style={ this.props.filterEvents === 'past' ? {color: 'black'} : {color: '#cccccc'}}
                name="past" className="btn btn-filter" onClick={this.props.handleFilterBtnClickPC}>Past events</button>
            </span>
            <span className="filterEventsMobile">Show:
              <form style={{display: 'inline', marginLeft: '10px'}}>
                <select id="view" onChange={this.props.handleFilterBtnClickMobile}>
                  <option style={{color: 'black'}} value="all">All events</option>
                  <option style={{color: 'black'}} value="future">Future events</option>
                  <option style={{color: 'black'}} value="past">Past events</option>
                </select>
              </form>
            </span>
          </span>
          <span>
            <span className="btn-view" style={ this.props.view === 'grid' ? {color: 'black'} : {color: '#cccccc'}} onClick={() => this.props.handleViewBtnClick('grid')}> <i className="fa fa-th" ></i></span>
            <span className="btn-view" style={ this.props.view === 'list' ? {color: 'black'} : {color: '#cccccc'}} onClick={() => this.props.handleViewBtnClick('list')}>  <i className="fa fa-align-justify" ></i></span>
          </span>
        </div>
        <div className={this.props.view === 'grid' ? "grid" : "list" }>
        <span id="spinner" className="spinner"></span>
          {this.renderHome()}
        </div>
      </div>
    <Link to="/create"><button className="btn-add">+</button></Link>
    </div>
    )
  };
};
