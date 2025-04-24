import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.publish("tasks", function (query = {}, page = 0, perPage = 4) {
  if (!this.userId) {
    return this.ready();
  }

  if (perPage > 4) {
    perPage = 4;
  }

  const limit = perPage;
  const skip = perPage * page;

  return TasksCollection.find(
    {
      ...query,
      $or: [{ isPrivate: { $ne: true } }, { userId: this.userId }],
    },
    {
      sort: { createdAt: -1 },
      skip: skip,
      limit: limit,
    }
  );
});
