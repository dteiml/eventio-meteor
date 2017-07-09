import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import App from './../imports/App';
import {Events} from './../imports/api/events';

Meteor.startup(() => {
  Tracker.autorun(() => {
    // const AppRoute = ({events}) => {
    //   return (
    //     <Route children={() => {
    //       <App events={events}/>
    //     }}/>
    //   )
    // }
    let user = Meteor.user();
    let events = Events.find().fetch();
    console.log('Main.js events', events);
    ReactDOM.render(
      <Router>
        <Route render={(props) =>
          <App user={user} events={events} {...props}/>
        }/>
      </Router>,
    document.getElementById('root')
  );
  })

  //allows us to access props.history object
});
