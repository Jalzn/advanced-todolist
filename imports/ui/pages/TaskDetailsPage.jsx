import {
  Alert,
  AlertTitle,
  Box,
  Container,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { TaskForm } from "../components/TaskForm";
import { Link, useParams } from "react-router-dom";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { ChevronLeft } from "@mui/icons-material";
import { Meteor } from "meteor/meteor";

export const TaskDetailsPage = () => {
  const { taskId } = useParams();

  const [message, setMessage] = useState("");

  const MODE = {
    VISUAL: 0,
    EDIT: 1,
  };

  const [mode, setMode] = useState(MODE.VISUAL);

  const toggleMode = () => {
    // Should make more readable
    setMode(1 - mode);
  };

  const isLoading = useSubscribe("tasks");
  const task = useTracker(() => TasksCollection.findOne({ _id: taskId }));

  const updateTask = (form) => {
    Meteor.callAsync("tasks.update", { _id: taskId, doc: form });
    setMessage("Tarefa atualizada com sucesso.");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <Container sx={{ my: 10 }} maxWidth="md">
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component={Link} to="/" sx={{ mr: 1, p: 0.5 }}>
            <ChevronLeft fontSize="inherit" />
          </IconButton>
          <Typography variant="h4">Minha Tarefa</Typography>
        </Box>
        <FormGroup>
          <FormControlLabel
            label="Editar"
            control={<Switch value={mode} onClick={toggleMode} />}
          />
        </FormGroup>
      </Box>
      {message && (
        <Alert sx={{ mb: 4 }}>
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      )}
      {isLoading() || !task ? (
        <p>Loading...</p>
      ) : (
        <TaskForm
          values={task}
          disabled={mode === MODE.VISUAL}
          onSubmit={(form) => updateTask(form)}
        />
      )}
    </Container>
  );
};
