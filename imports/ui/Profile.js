import React from 'react';
import {Meteor} from 'meteor/meteor';
import {fontawesome} from 'meteor/fortawesome:fontawesome';

import Nav from './Nav';
import GridItem from './GridItem';
import ListItem from './ListItem';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  renderEvents() {
    console.log('Profile.js this.props.user', this.props.user);
     if (this.props.user) {
      console.log('Profile.js renderEvents() this.props.events', this.props.events);
      return (
        this.props.events.map((event) => {
          if(this.props.user.profile.attending.includes(event._id)) {
            if(this.props.profileView === 'grid') {
              return (
                <div className='gridItem' onClick={() => this.handleItemClick(event)} >
                  <GridItem
                    event={event}
                    user={this.props.user}
                    key={event._id}
                    attending={this.props.user.profile.attending}/>
                </div>
              )
            } else if(this.props.profileView === 'list') {
              return (
                <div className='listItem' onClick={() => this.handleItemClick(event)} >
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
  }
  handleItemClick(event) {
    let id = event._id;
    // console.log('Home.js handleItemClick id', id);
    let url = '/detail:' + id;

    //redirects to detial of event
    this.props.history.push(url);
  }
  render() {
    return (
      <div className="main">
        <Nav user={this.props.user} onLogout={this.props.onLogout} match={this.props.match} history={this.props.history}/>
        <div className="section">
          <div className="profileHeader">
            <span className="bigCircle">{this.props.user && this.props.user.profile.firstName.charAt(0) + ' ' + this.props.user.profile.lastName.charAt(0)} </span>
            <span className="profileFooter">
              <span className="profileName">{this.props.user && this.props.user.profile.firstName + ' ' + this.props.user.profile.lastName}</span>
              <span className="profileEmail">{this.props.user && this.props.user.emails[0].address}</span>
            </span>
          </div>
        <div className="header">
          <span>
            <h1>My events</h1>
          </span>
          <span>
            <span className="btn-view" style={ this.props.profileView === 'grid' ? {color: 'black'} : {color: '#cccccc'}} onClick={() => this.props.handleViewBtnClickProfile('grid')}> <i className="fa fa-th" ></i></span>
            <span className="btn-view" style={ this.props.profileView === 'list' ? {color: 'black'} : {color: '#cccccc'}} onClick={() => this.props.handleViewBtnClickProfile('list')}>  <i className="fa fa-align-justify" ></i></span>
          </span>
        </div>
        <div className={this.props.profileView === 'grid' ? "grid" : "list" }>
          {this.renderEvents()}
        </div>
      </div>
      </div>
    )
  };
};
