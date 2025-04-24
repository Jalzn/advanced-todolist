import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  IconButton,
  Typography,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";

import { TasksList } from "../components/TasksList";
import { CreateTaskModal } from "../components/CreateTaskModal";
import { TasksCollection } from "../../api/TasksCollection";
import { TasksPagination } from "../components/TasksPagination";

const showTasksDoneVar = new ReactiveVar(false);
const formVar = new ReactiveVar({ name: "" });
const currPageVar = new ReactiveVar(0);

export const TasksPage = () => {
  const showTasksDone = useTracker(() => showTasksDoneVar.get());
  const form = useTracker(() => formVar.get());
  const currPage = useTracker(() => currPageVar.get());

  const [totalTasks, setTotalTasks] = useState(0);

  const query = {
    status: showTasksDone
      ? { $in: ["CADASTRADA", "EM_ANDAMENTO", "CONCLUIDA"] }
      : { $in: ["CADASTRADA", "EM_ANDAMENTO"] },
  };

  if (form.name) {
    query.name = { $regex: `^${form.name}`, $options: "i" };
  }

  const isLoading = useSubscribe("tasks", query, currPage);

  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );

  Meteor.call("tasks.total", query, (err, res) => {
    if (!err) {
      setTotalTasks(res);
    }
  });

  const removeTask = async (id) => {
    await Meteor.callAsync("tasks.remove", id);
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
          <Typography variant="h4">Minhas Tarefas</Typography>
        </Box>
      </Box>
      <Box sx={{ background: "white", p: 4, borderRadius: 2 }}>
        <Grid container sx={{ mb: 4 }}>
          <Grid size={6}>
            <TextField
              label="Nome da Tarefa"
              size="small"
              fullWidth
              onChange={(e) => {
                formVar.set({ ...formVar, name: e.target.value });
              }}
            />
          </Grid>
          <Grid size={6} sx={{ display: "flex", alignItems: "center" }}>
            <FormGroup sx={{ ml: "auto" }}>
              <FormControlLabel
                label="Mostrar concluidas?"
                control={
                  <Switch
                    checked={showTasksDone}
                    onChange={() => showTasksDoneVar.set(!showTasksDone)}
                  />
                }
              />
            </FormGroup>
          </Grid>
        </Grid>
        <TasksList
          tasks={tasks}
          isLoading={isLoading()}
          onRemove={(id) => removeTask(id)}
        />
        <TasksPagination
          total={totalTasks}
          currentPage={currPage}
          perPage={4}
          onPageChange={(newPage) => currPageVar.set(newPage)}
        />
      </Box>
      <CreateTaskModal />
    </>
  );
};
