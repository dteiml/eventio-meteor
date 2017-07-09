import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
  }
  renderTextProp() {
    console.log('Nav.js renderTextProp this.props', this.props);
    if(this.props.match.path === "/detail:id") {
      return (
        <span onClick={this.goBack} className="backToEvents"><i className="fa fa-arrow-left"></i> Back to events</span>
      )
    }
  }
  goBack() {
    this.props.history.goBack();
  }
  render() {
    return (
      <div className="nav">
        <Link className="logo" to="/home">E.</Link>
        {this.renderTextProp()}
        <span>
          <span className="smallCircle">{this.props.user && this.props.user.profile.firstName.charAt(0)} {this.props.user && this.props.user.profile.lastName.charAt(0)}</span>
          <span className="dropdown">
            <button className="dropbtn">
              <span className="navName">{this.props.user && this.props.user.profile.firstName} {this.props.user && this.props.user.profile.lastName} </span>  <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <Link to="/profile">My profile</Link>
              <Link to='/' onClick={this.props.onLogout}>Logout</Link>
            </div>
          </span>
        </span>
    </div>
    )
  }
}
