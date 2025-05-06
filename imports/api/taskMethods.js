import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
  "tasks.insert"(doc) {
    check(doc, {
      title: String,
      description: String,
      status: String,
      date: String,
    });

    if (!this.userId) {
      throw new Meteor.Error("Not authorized");
    }

    return TasksCollection.insertAsync({
      ...doc,
      userId: this.userId,
      createdAt: new Date(),
    });
  },

  "tasks.remove"(_id) {
    check(_id, String);

    const task = TasksCollection.findOne(_id);
    if (!task) {
      throw new Meteor.Error("Task not found");
    }

    if (task.userId !== this.userId) {
      throw new Meteor.Error("Not authorized to remove this task");
    }

    return TasksCollection.removeAsync(_id);
  },

  "tasks.update"({ _id, doc }) {
    check(_id, String);
    check(doc, Object);

    const task = TasksCollection.findOne(_id);
    if (!task) {
      throw new Meteor.Error("Task not found");
    }

    if (task.userId !== this.userId) {
      throw new Meteor.Error("Not authorized to update this task");
    }

    return TasksCollection.updateAsync(_id, {
      $set: {
        ...doc,
        updatedAt: new Date(),
      },
    });
  },
});
