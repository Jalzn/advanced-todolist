import React, { useState } from "react";

import { Alert, AlertTitle, Button, TextField } from "@mui/material";

export const TaskForm = ({ values, onSuccess }) => {
  const [form, setForm] = useState({
    name: values?.name ?? "",
    description: values?.description ?? "",
    date: values?.date ?? "",
  });

  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /**
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {message && (
        <Alert color="error" icon={false}>
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      )}
      <TextField
        label="Nome"
        size="small"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <TextField
        label="Descricao"
        size="small"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <TextField
        label="Data"
        size="small"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <Button loading={isLoading} variant="contained" type="submit">
        Salvar
      </Button>
    </form>
  );
};
