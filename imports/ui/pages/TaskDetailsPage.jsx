import {
  Alert,
  AlertTitle,
  Box,
  Button,
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
import { ChevronLeft, ArrowForward } from "@mui/icons-material";
import { Meteor } from "meteor/meteor";

export const TaskDetailsPage = () => {
  const { taskId } = useParams();

  const [toast, setToast] = useState({ message: "", severity: "" });
  const [loading, setLoading] = useState(false);

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

  const showToast = (message, severity) => {
    setToast({ message, severity });
    setTimeout(() => {
      setToast({ message: "", severity: "" });
    }, 2000);
  };

  const updateTask = async (form) => {
    try {
      await Meteor.callAsync("tasks.update", { _id: taskId, doc: form });
      showToast("Tarefa atualizada com sucesso.");
    } catch (e) {
      if (e instanceof Meteor.Error) {
        showToast(e.error, "error");
      }
    }
  };

  const progressTask = async () => {
    const statusFlow = {
      CADASTRADA: "EM_ANDAMENTO",
      EM_ANDAMENTO: "CONCLUIDA",
    };

    if (!task) return;
    setLoading(true);

    const nextStatus = statusFlow[task.status];

    if (nextStatus) {
      await Meteor.callAsync("tasks.update", {
        _id: taskId,
        doc: { ...task, status: nextStatus },
      });
      showToast(`Tarefa movida para ${nextStatus.replace("_", " ")}.`);
    } else {
      showToast("Tarefa já foi finalizada.");
    }

    setLoading(false);
  };

  return (
    <>
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
      {mode === MODE.VISUAL && (
        <Box sx={{ mb: 4, display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<ArrowForward />}
            onClick={progressTask}
            sx={{ mr: 2 }}
          >
            {loading ? "Carregando" : "Progredir Tarefa"}
          </Button>
        </Box>
      )}
      {toast.message && (
        <Alert
          sx={{ mb: 4 }}
          severity={toast.severity ? toast.severity : `success`}
        >
          <AlertTitle>{toast.message}</AlertTitle>
        </Alert>
      )}
      <Box sx={{ p: 4, borderRadius: 2, background: "white" }}>
        {isLoading() || !task ? (
          <p>Loading...</p>
        ) : (
          <TaskForm
            values={task}
            disabled={mode === MODE.VISUAL}
            onSubmit={(form) => updateTask(form)}
          />
        )}
      </Box>
    </>
  );
};
