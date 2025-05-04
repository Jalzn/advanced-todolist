import { Meteor } from "meteor/meteor";

import { TasksCollection } from "../imports/api/TasksCollection";
import "../imports/api/taskPublications";
import "../imports/api/taskMethods";

Meteor.startup(async () => {
  if ((await TasksCollection.find().countAsync()) === 0) {
    [
      { name: "Hello world", description: "Hello world", date: "Today" },
    ].forEach((task) => TasksCollection.insertAsync(task));
  }
});
