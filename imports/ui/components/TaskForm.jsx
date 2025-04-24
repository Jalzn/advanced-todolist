import React, { useEffect, useState } from "react";

import {
  Alert,
  AlertTitle,
  Button,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { TASK_STATUS } from "../constants/tasksConstants";

export const TaskForm = ({ values, disabled, onSubmit }) => {
  const [form, setForm] = useState({
    name: values?.name ?? "",
    description: values?.description ?? "",
    status: values?.status ?? "CADASTRADA",
    isPrivate: values?.isPrivate ?? false,
    date: values?.date ?? "",
  });

  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setForm({
      name: values?.name ?? "",
      description: values?.description ?? "",
      status: values?.status ?? "CADASTRADA",
      isPrivate: values?.isPrivate ?? false,
      date: values?.date ?? "",
    });
  }, [values]);

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
    await onSubmit(form);
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
        disabled={disabled}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <TextField
        label="Descricao"
        size="small"
        disabled={disabled}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <FormGroup>
        <InputLabel>Status</InputLabel>
        <Select
          size="small"
          label="Status"
          disabled={disabled}
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          {Object.keys(TASK_STATUS).map((key) => (
            <MenuItem key={key} value={key}>
              {TASK_STATUS[key]}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>
      <TextField
        label="Data"
        size="small"
        type="date"
        InputLabelProps={{ shrink: true }}
        disabled={disabled}
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <FormGroup>
        <FormControlLabel
          label="A tarefa e pessoal?"
          control={
            <Switch
              disabled={disabled}
              checked={form.isPrivate}
              onChange={() => setForm({ ...form, isPrivate: !form.isPrivate })}
            />
          }
        />
      </FormGroup>
      <Button
        loading={isLoading}
        disabled={disabled}
        variant="contained"
        type="submit"
      >
        Salvar
      </Button>
    </form>
  );
};
