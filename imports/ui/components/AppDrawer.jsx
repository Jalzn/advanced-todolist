import React from "react";
import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useAuth } from "../hooks/useAuth";

export const drawerWidth = 280;

export const AppDrawer = () => {
  const { currentUser, logout } = useAuth();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            Menu
          </Typography>
        </Box>
        <Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Person />
            <Typography sx={{ flexGrow: 1 }}>
              {currentUser?.username}
            </Typography>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={logout}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};
