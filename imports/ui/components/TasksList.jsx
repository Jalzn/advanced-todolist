import React from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { Meteor } from "meteor/meteor";

import { TaskCard } from "../components/TaskCard";
import { List } from "@mui/material";

export const TasksList = () => {
  const isLoading = useSubscribe("tasks");
  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );

  const removeTask = async (taskId) => {
    await Meteor.callAsync("tasks.remove", taskId);
  };

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <List>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onRemove={removeTask} />
      ))}
    </List>
  );
};
