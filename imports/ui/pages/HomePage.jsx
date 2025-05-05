import React, { useState } from "react";
import { TasksList } from "../components/TasksList";
import { CreateTaskModal } from "../components/CreateTaskModal";
import { Container } from "@mui/material";

export const HomePage = () => {
  //   const user = useUser();

  //   const logout = () => {
  //     Meteor.logout();
  //   };

  return (
    <>
      <Container className="my-10">
        <TasksList />
      </Container>
      <CreateTaskModal />
    </>
  );
};
