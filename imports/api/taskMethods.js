import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";
import { check } from "meteor/check";

Meteor.methods({
  "tasks.insert"(doc) {
    check(doc, {
      name: String,
      description: String,
      status: String,
      isPrivate: Boolean,
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

  async "tasks.remove"(_id) {
    check(_id, String);

    const task = TasksCollection.findOneAsync(_id);

    if (!task) {
      throw new Meteor.Error("Task not found");
    }

    if (task.userId !== this.userId) {
      throw new Meteor.Error("Not authorized to remove this task");
    }

    return TasksCollection.removeAsync(_id);
  },

  async "tasks.update"({ _id, doc }) {
    check(_id, String);
    check(doc, Object);

    const task = await TasksCollection.findOneAsync(_id);

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
