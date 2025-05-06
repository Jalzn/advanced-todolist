import React from "react";
import { Box, Container } from "@mui/material";
import { AppDrawer } from "../components/AppDrawer";

export const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppDrawer />

      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        {children}
      </Container>
    </Box>
  );
};
