import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Home as HomeIcon,
  Assignment as TaskIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useAuth } from "../hooks/useAuth";
import { NavLink } from "react-router-dom";

export const drawerWidth = 280;

const navItems = [
  { label: "Home", path: "/", icon: <HomeIcon /> },
  { label: "Tarefas", path: "/tasks", icon: <TaskIcon /> },
  { label: "Meu Perfil", path: "/me", icon: <PersonIcon /> },
];

export const AppDrawer = () => {
  const { currentUser, logout } = useAuth();
  const profile = currentUser?.profile;

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
            Advanced Todo
          </Typography>

          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  sx={{
                    borderRadius: 1,
                    "&.active": {
                      backgroundColor: "primary.main",
                      color: "white",
                      "& .MuiSvgIcon-root": { color: "white" },
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Avatar
              alt={profile.name}
              src={profile.photoBase64}
              sx={{ width: 48, height: 48 }}
            />
            <Box>
              <Typography variant="body1" fontWeight="bold">
                {profile.name || currentUser?.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.email}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            color="error"
            size="small"
            fullWidth
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
