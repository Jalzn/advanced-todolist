import React, { useState } from "react";
import { Box, Container, IconButton, Modal } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { TaskForm } from "../components/TaskForm";
import { TasksList } from "../components/TasksList";

export const HomePage = () => {
  //   const user = useUser();

  //   const logout = () => {
  //     Meteor.logout();
  //   };

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Container className="my-10">
        <TasksList />
      </Container>
      <Modal open={showForm} onClose={() => setShowForm(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <TaskForm onSuccess={() => setShowForm(false)} />
        </Box>
      </Modal>
      <IconButton
        onClick={() => setShowForm(true)}
        sx={{
          position: "fixed",
          bottom: 15,
          right: 15,
          backgroundColor: "primary.main",
          color: "white",
          ":hover": { backgroundColor: "primary.dark" },
        }}
      >
        <AddIcon />
      </IconButton>
    </>
  );
};
