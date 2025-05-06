import React from "react";
import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useAuth } from "../hooks/useAuth";

export const AppDrawer = () => {
  const { currentUser, logout } = useAuth();

  return (
    <Drawer open={true}>
      <Box
        sx={{
          width: 320,
          height: "100%",
          padding: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Divider sx={{ mt: "auto" }} />
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
          <Person />
          <Typography>{currentUser.username}</Typography>
          <Button
            sx={{ ml: "auto" }}
            color="warning"
            variant="contained"
            size="small"
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
