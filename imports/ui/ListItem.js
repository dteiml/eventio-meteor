import React from 'react';
import { Meteor } from 'meteor/meteor'; //for handling user side of join/leave
import { Events } from './../api/events'; //for handling join/leave
import { Link } from 'react-router-dom'; //for edit button

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.event._id
    };

    // console.log('ListItem.js constructor this.props.', this.props);

    this.handleJoinBtnClick = this.handleJoinBtnClick.bind(this);
    this.handleLeaveBtnClick = this.handleLeaveBtnClick.bind(this);
    this.handleEditBtnClick = this.handleEditBtnclick.bind(this);
    this.renderDate = this.renderDate.bind(this); 
    // this.renderTitle = this.renderTitle.bind(this);
    // this.renderDescription = this.renderDescription.bind(this);
    // this.renderHostName = this.renderHostName.bind(this);
  }
  renderListItemBtn() {
    let id = this.state.id; //event id

    if(this.props.user && this.props.event.host === this.props.user._id) {
      let url = "/edit:" + id;
      return (
        <Link to={url} onClick={this.handleEditBtnclick}>
        <button className="edit">Edit</button></Link>
      )
    }

    else if(this.props.attending && this.props.attending.includes(id)) {
      return (
        <button className="leave" onClick={this.handleLeaveBtnClick}>Leave</button>
      )
    } else {
      return (
        <button className="join" onClick={this.handleJoinBtnClick}>Join</button>
      )
    }
  }

  handleEditBtnclick(evt) {
    evt.stopPropagation();
  }

  handleLeaveBtnClick() {
    let user = this.props.user;
    let id = this.state.id; //event id

    let name = user.profile.firstName + ' ' + user.profile.lastName;

    Meteor.users.update(
      { _id: user._id},
      { $pull: { "profile.attending": id }}
    );

    Events.update(
      { _id: id },
      { $pull: {attendeesIds: user._id, attendeesNames: name}}
    );
  }

  handleJoinBtnClick() {
    let user = this.props.user;
    let id = this.state.id;

    let name = user.profile.firstName + ' ' + user.profile.lastName;

    Meteor.users.update(
      { _id: user._id},
      { $push: { "profile.attending": id }}
    );

    Events.update(
      { _id: id },
      { $push: {attendeesIds: user._id, attendeesNames: name}}
    );

  }

  renderDate() {
    let dateShort =  this.props.event.date;
    let dateArray = dateShort.split('-');

    let date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);

    var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

    let month = months[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();

    let time = this.props.event.time;

    let dateString = month + ' ' + day + ', ' + year + ' - ' + time;
    return dateString;
  }

  // renderTitle() {
  //   let title = this.props.event.title;
  //   let maxLength = 25;
  //   if(title.length > maxLength) {
  //     let shortTitle = "";
  //
  //     let titleArray = title.split(' ');
  //
  //     let characterSum = 0;
  //     let i = 0;
  //
  //     while (characterSum < maxLength - 3) {
  //       characterSum += titleArray[i].length;
  //       i += 1;
  //     }
  //     for (j = 0; j < i - 1; ++j) {
  //       shortTitle += titleArray[j] + ' ';
  //     }
  //
  //     return shortTitle + '...';
  //   }
  //   //end of if code block
  //   return title;
  // }
  //
  // renderDescription() {
  //   let maxLength = 30;
  //   let description = this.props.event.description;
  //   if (description.length > maxLength) {
  //       let shortDescription = "";
  //
  //       descriptionArray = description.split(' ');
  //
  //       let characterSum = 0;
  //       let i = 0;
  //
  //       while (characterSum < maxLength - 3) {
  //         characterSum += descriptionArray[i].length;
  //         i += 1;
  //       }
  //
  //       for (j = 0; j < i; j++) {
  //         shortDescription += descriptionArray[j] + ' ';
  //       }
  //
  //       return shortDescription + '...';
  //   }
  //   //end of if code block
  //   return description;
  // }
  //
  // renderHostName() {
  //   let maxLength = 30;
  //   let name = this.props.event.hostName;
  //   if (name.length > maxLength) {
  //       let shortName = "";
  //       nameArray = name.split(' ');
  //
  //       let characterSum = 0;
  //       let i = 0;
  //
  //       while (characterSum < maxLength - 3) {
  //         characterSum += nameArray[i].length;
  //         i += 1;
  //       }
  //       for (j = 0; j < i; ++j) {
  //         shortName += nameArray[j] + ' ';
  //       }
  //
  //       return shortName + '...';
  //   }
  //   //end of if code block
  //   return name;
  // }

  render() {
    return (
      <div className="listContent">
        <span className="itemTitle">{this.props.event.title}</span>
        <span ref="description" className="itemDescription">{this.props.event.description}</span>
        <span className="itemHost">{this.props.event.hostName}</span>
        <span className="itemFooter">
          <span className="dateAndCapacity">
            <span className="itemDate">{this.renderDate()}</span>
            <span className="itemCapacity"> {this.props.event.attendeesIds.length} of {this.props.event.capacity}</span>
          </span>
          <span className="listItemBtn"> {this.renderListItemBtn()} </span>
        </span>
      </div>
    )
  }
}
