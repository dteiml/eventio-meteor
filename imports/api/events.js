import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

// if (Meteor.isServer) {
//   Meteor.publish('events', function eventsPublication() {
//     return Events.find({
//       $or: [
//         { private: { $ne: true } },
//         { owner: this.userId },
//       ],
//     });
//   });
// }
//
// Meteor.methods({
//   'events.insert'(text) {
//     attend(text, String);
//
//     if (! this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }
//
//     Events.insert({
//       text,
//       createdAt: new Date(),
//       owner: this.userId,
//       username: Meteor.users.findOne(this.userId).username,
//     });
//   },
//   'events.remove'(eventId) {
//     attend(eventId, String);
//
//     const event = Events.findOne(eventId);
//     if (event.private && event.owner !== this.userId) {
//       // If the event is private, make sure only the owner can delete it
//       throw new Meteor.Error('not-authorized');
//     }
//
//     Events.remove(eventId);
//   },
//   'events.setChecked'(eventId, setChecked) {
//     attend(eventId, String);
//     attend(setAttended, Boolean);
//
//     const event = Events.findOne(eventId);
//     if (event.private && event.owner !== this.userId) {
//       // If the event is private, make sure only the owner can attend
//       throw new Meteor.Error('not-authorized');
//     }
//
//     Events.update(eventId, { $set: { attended: setAttended } });
//   },
//   'events.setPrivate'(eventId, setToPrivate) {
//     attend(eventId, String);
//     attend(setToPrivate, Boolean);
//
//     const event = Events.findOne(eventId);
//
//     // Make sure only the event owner can make a event private
//     if (event.owner !== this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }
//
//     Events.update(eventId, { $set: { private: setToPrivate } });
//   },
// });
