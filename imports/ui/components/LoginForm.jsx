import { Meteor } from "meteor/meteor";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  /**
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const submit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(form.username, form.password, (err) => {
      if (err) {
        setMessage(err.reason ?? "Unknown reason");
      } else {
        setMessage("");
        navigate("/");
      }
    });
  };

  return (
    <form className="flex flex-col gap-4 w-96" onSubmit={submit}>
      {message && (
        <p className="text-red-600 text-sm text-center bg-red-600/10 p-2 rounded">
          {message}
        </p>
      )}
      <TextField
        size="small"
        type="text"
        label="Username"
        required
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <TextField
        size="small"
        type="password"
        label="Password"
        required
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Button type="submit" variant="contained">
        Entrar
      </Button>
    </form>
  );
};
