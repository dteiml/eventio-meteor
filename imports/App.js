import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Accounts } from 'meteor/accounts-base';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


import Edit from './ui/Edit';
import Login from './ui/Login';
import Signup from './ui/Signup';
import Home from './ui/Home';
import NotFound from './ui/NotFound';
import Create from './ui/Create';
import Detail from './ui/Detail';
import Profile from './ui/Profile';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/home', '/detail', '/profile', '/edit', '/create'];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'grid',
      filterEvents: 'all',
      profileView: 'grid'
    }

    this.handleViewBtnClick = this.handleViewBtnClick.bind(this);
    this.handleFilterBtnClickPC = this.handleFilterBtnClickPC.bind(this);
    this.handleFilterBtnClickMobile = this.handleFilterBtnClickMobile.bind(this);
    this.handleViewBtnClickProfile = this.handleViewBtnClickProfile.bind(this);
  }
  onEnterPublicPage() {
    if (Meteor.userId()) {
      this.props.history.replace('/home');
    }
  }
  onEnterPrivatePage() {
    if (!Meteor.userId()) {
      this.props.history.replace('/');
    }
  }
  onAuthChange(isAuthenticated) {
    console.log('App.js OnAuthChange this.props', this.props);
    const pathname = this.props.location.pathname;
    const pathnameWithoutId = pathname.split(':')[0];
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathnameWithoutId);
    const isAuthenticatedPage = authenticatedPages.includes(pathnameWithoutId);
    console.log('App.js isAuthenticatedPage, isUnauthenticatedPage', isAuthenticatedPage, isUnauthenticatedPage);
    if (isUnauthenticatedPage && isAuthenticated) {
      this.props.history.replace('/home');
    } else if (isAuthenticatedPage && !isAuthenticated) {
      this.props.history.replace('/');
    }
  }
  componentWillMount() {
    const isAuthenticated = !!Meteor.userId();
    console.log('App.js componentWillMount() Meteor.user()', Meteor.user());
    this.onAuthChange(isAuthenticated);
  }
  onLogout() {
    Accounts.logout(() => this.props.history.push('/'));
  }

  //handleChange methods
  handleFilterBtnClickPC(evt) {
    let filterEvents = evt.target.name;
    this.setState({
      filterEvents
    });
  }
  handleViewBtnClick(view) {
    this.setState({
      view
    })
  }
  handleFilterBtnClickMobile(evt) {
    let filterEvents = evt.target.value;
    this.setState({
      filterEvents
    })
  }

  handleViewBtnClickProfile(profileView) {
    this.setState({
      profileView
    })
  }
  render() {
    return (
      <Switch>
          <Route exact path="/" component={Login} onEnter={this.onEnterPublicPage}/>
          <Route exact path="/signup" component={Signup} onEnter={this.onEnterPublicPage}/>

          <Route exact path="/home" render={(props) => {
            return <Home {...props} user={this.props.user}
            onLogout={this.onLogout} view={this.state.view} filterEvents={this.state.filterEvents}
            handleFilterBtnClickPC={this.handleFilterBtnClickPC} handleViewBtnClick={this.handleViewBtnClick}
            handleFilterBtnClickMobile={this.handleFilterBtnClickMobile} events={this.props.events} />
          }} onEnter={this.onEnterPrivatePage} />

          <Route exact path="/profile" render={(props) => {
            return <Profile {...props} user={this.props.user}
            onLogout={this.onLogout} profileView={this.state.profileView}
            handleViewBtnClickProfile={this.handleViewBtnClickProfile} events={this.props.events} />
          }} onEnter={this.onEnterPrivatePage}/>

          <Route exact path="/create" onEnter={this.onEnterPrivatePage} render={(props) => {
            return <Create {...props} user={this.props.user} />
          }} onEnter={this.onEnterPrivatePage}/>

          <Route exact path="/detail:id" render={(props) => {
            return <Detail {...props} user={this.props.user}
            onLogout={this.onLogout} events={this.props.events} />
          }} onEnter={this.onEnterPrivatePage}/>

          <Route exact path="/edit:id" render={(props) => {
            return <Edit {...props} user={this.props.user}
            onLogout={this.onLogout} events={this.props.events} />
          }}  onEnter={this.onEnterPrivatePage} />

          <Route path="*" component={NotFound}/>
      </Switch>
    )
  }
}

// <Route exact path="/create" component={Create} onEnter={this.onEnterPrivatePage}/>
// <Route exact path="/event:id" component={Detail} onEnter={this.onEnterPrivatePage}/>
// <Route exact path="/profile" component={Profile} onEnter={this.onEnterPrivatePage}/>
