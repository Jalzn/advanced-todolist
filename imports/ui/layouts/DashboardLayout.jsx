import React from "react";
import { Box, Container } from "@mui/material";
import { AppDrawer } from "../components/AppDrawer";
import { grey } from "@mui/material/colors";

export const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: grey[100] }}>
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
