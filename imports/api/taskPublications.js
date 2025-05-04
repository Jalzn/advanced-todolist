import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.publish("tasks", () => {
  return TasksCollection.find({}, { sort: { createdAt: -1 } });
});
