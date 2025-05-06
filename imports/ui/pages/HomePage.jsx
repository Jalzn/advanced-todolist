import React, { useState } from "react";
import { TasksList } from "../components/TasksList";
import { CreateTaskModal } from "../components/CreateTaskModal";
import { Container } from "@mui/material";
import { AppDrawer } from "../components/AppDrawer";

export const HomePage = () => {
  return (
    <>
      <AppDrawer />
      <Container className="my-10">
        <TasksList />
      </Container>
      <CreateTaskModal />
    </>
  );
};
