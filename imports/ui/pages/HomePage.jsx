import React from "react";
import { TasksList } from "../components/TasksList";
import { CreateTaskModal } from "../components/CreateTaskModal";

export const HomePage = () => {
  return (
    <>
      <TasksList />
      <CreateTaskModal />
    </>
  );
};
