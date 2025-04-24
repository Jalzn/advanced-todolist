import React from "react";

import { TaskCard } from "../components/TaskCard";
import { List, Skeleton, Stack } from "@mui/material";

export const TasksList = ({ tasks, isLoading, onRemove }) => {
  if (isLoading) {
    return (
      <>
        <Skeleton sx={{ height: 80 }} />
        <Skeleton sx={{ height: 80 }} />
        <Skeleton sx={{ height: 80 }} />
        <Skeleton sx={{ height: 80 }} />
      </>
    );
  }

  return (
    <List>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onRemove={onRemove} />
      ))}
    </List>
  );
};
