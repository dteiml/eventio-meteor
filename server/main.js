import { Meteor } from 'meteor/meteor';
import './../imports/api/events';

Meteor.startup(() => {
  console.log('Server running');
});
