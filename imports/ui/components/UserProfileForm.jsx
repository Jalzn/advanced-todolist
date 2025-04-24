import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";

const sexOptions = ["Masculino", "Feminino", "Outro"];

export const UserProfileForm = () => {
  const { currentUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    birthDate: "",
    sex: "",
    company: "",
    photoBase64: "",
  });

  useEffect(() => {
    const profile = currentUser?.profile;
    if (profile) {
      setForm((prev) => ({
        ...prev,
        name: profile?.name || "",
        email: profile?.email || "",
        birthDate: profile?.birthDate || "",
        sex: profile?.sex || "",
        company: profile?.company || "",
        photoBase64: profile?.photoBase64 || "",
      }));
    }
  }, [currentUser?._id]);

  /**
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string, value: unknown }>} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, photoBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  /**
   * @param {React.FormEvent} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call("user.updateProfile", form, (err) => {
      if (err) {
        console.error("Erro ao salvar perfil:", err);
      } else {
        console.log("Perfil salvo com sucesso!");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid
          size={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Foto do usuário"
            src={form.photoBase64}
            sx={{ width: 100, height: 100 }}
          />
          <Button variant="contained" component="label">
            Upload da Foto
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
        </Grid>
        <Grid
          size={9}
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          <TextField
            label="Nome"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            fullWidth
            required
          />
          <TextField
            label="Data de Nascimento"
            name="birthDate"
            type="date"
            value={form.birthDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
          <FormControl fullWidth required>
            <InputLabel id="sex-label">Sexo</InputLabel>
            <Select
              labelId="sex-label"
              name="sex"
              value={form.sex}
              onChange={handleChange}
              label="Sexo"
            >
              {sexOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Empresa"
            name="company"
            value={form.company}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Salvar Perfil
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
