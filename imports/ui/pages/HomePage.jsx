import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { useAuth } from "../hooks/useAuth";
import {
  CheckCircleOutline,
  FormatListNumbered,
  HourglassEmpty,
  ListAlt,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { currentUser } = useAuth();

  const isLoading = useSubscribe("tasks");
  const { total, pending, done } = useTracker(() => {
    /** @type {Object[]} */
    const tasks = TasksCollection.find({}).fetch();

    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === "EM_ANDAMENTO").length;
    const done = tasks.filter((t) => t.status === "CONCLUIDA").length;

    return { total, pending, done };
  });

  if (isLoading()) {
    return <p>loading...</p>;
  }

  return (
    <>
      <Typography variant="h5" component="h2" align="center" mb={8}>
        Ola {currentUser.profile.name}, seja bem vindo ao Todo List
      </Typography>
      <Grid container spacing={4} mb={8}>
        <Grid size={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <FormatListNumbered color="primary" fontSize="large" />
                <Box>
                  <Typography variant="h6">Total de Tarefas</Typography>
                  <Typography variant="h4">{total}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <HourglassEmpty color="warning" fontSize="large" />
                <Box>
                  <Typography variant="h6">Em Andamento</Typography>
                  <Typography variant="h4">{pending}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <CheckCircleOutline color="success" fontSize="large" />
                <Box>
                  <Typography variant="h6">Concluídas</Typography>
                  <Typography variant="h4">{done}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container>
        <Grid size={4}>
          <Card sx={{ height: 180 }}>
            <CardActionArea
              component={Link}
              to="/tasks"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <ListAlt color="info" fontSize="large" />
                    <Typography variant="h6">Minhas Tarefas</Typography>
                  </Box>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
