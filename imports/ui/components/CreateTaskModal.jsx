import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { TaskForm } from "./TaskForm";
import { Box, IconButton, Modal } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

export const CreateTaskModal = () => {
  const [show, setShow] = useState(false);

  /**
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const createTask = async (form) => {
    await Meteor.callAsync("tasks.insert", form);

    setShow(false);
  };

  return (
    <>
      <Modal open={show} onClose={() => setShow(false)}>
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
          <h2 className="text-xl text-center text-gray-700 mb-4">
            Nova Tarefa
          </h2>
          <TaskForm onSubmit={createTask} />
        </Box>
      </Modal>

      <IconButton
        onClick={() => setShow(true)}
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
