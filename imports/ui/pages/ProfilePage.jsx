import React from "react";
import { UserProfileForm } from "../components/UserProfileForm";
import { Box, IconButton, Typography } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
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
          <Typography variant="h4">Perfil do Usuário</Typography>
        </Box>
      </Box>
      <Box sx={{ p: 4, borderRadius: 2, background: "white" }}>
        <UserProfileForm />
      </Box>
    </>
  );
};
