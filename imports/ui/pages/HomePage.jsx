import React, { useState } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Assignment from "@mui/icons-material/Assignment";
import { TaskForm } from "../components/TaskForm";

export const HomePage = () => {
  //   const user = useUser();

  //   const logout = () => {
  //     Meteor.logout();
  //   };

  const isLoading = useSubscribe("tasks");
  const tasks = useTracker(() => TasksCollection.find({}).fetch());
  const [showForm, setShowForm] = useState(false);

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container className="my-10">
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task._id}
              sx={{ backgroundColor: "grey.200", marginBottom: 4 }}
            >
              <ListItemAvatar>
                <Avatar>
                  <Assignment />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={task.name} secondary={task.description} />
            </ListItem>
          ))}
        </List>
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
