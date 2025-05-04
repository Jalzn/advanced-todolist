import React, { useState } from "react";

import { Alert, AlertTitle, Button, TextField } from "@mui/material";

export const TaskForm = ({ values, onSuccess }) => {
  const [form, setForm] = useState({
    name: values?.name ?? "",
    description: values?.description ?? "",
    date: values?.data ?? "",
  });

  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /**
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const createTask = async (e) => {
    e.preventDefault();

    if (form.name == "" || form.description == "" || form.date == "") {
      setMessage("Digite os valores para os campos abaixo.");
      return;
    }

    setLoading(true);
    onSuccess(form);
    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={createTask}>
      {message && (
        <Alert color="error" icon={false}>
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      )}
      <TextField
        placeholder="Nome"
        size="small"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <TextField
        placeholder="Descricao"
        size="small"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <TextField
        placeholder="Data"
        size="small"
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <Button loading={isLoading} variant="contained" type="submit">
        Salvar
      </Button>
    </form>
  );
};
