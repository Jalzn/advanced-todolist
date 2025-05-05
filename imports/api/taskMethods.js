import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
  "tasks.insert"(doc) {
    return TasksCollection.insertAsync(doc);
  },
  "tasks.remove"(_id) {
    return TasksCollection.removeAsync(_id);
  },
  "tasks.update"({ _id, doc }) {
    return TasksCollection.updateAsync(_id, { $set: { ...doc } });
  },
});
