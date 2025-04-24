import React, { useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  Assignment as AssignmentIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { TASK_STATUS } from "../constants/tasksConstants";

export const TaskCard = ({ task, onRemove }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  /**
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e
   */
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = async () => {
    await onRemove(task._id);
    setAnchorEl(null);
  };

  return (
    <ListItem
      key={task._id}
      sx={{ backgroundColor: "grey.200", marginBottom: 4 }}
      secondaryAction={
        <IconButton edge="end" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <AssignmentIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={task.name} secondary={TASK_STATUS[task.status]} />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>
          <Link to={`/tasks/${task._id}`}>Editar</Link>
        </MenuItem>
        <MenuItem onClick={handleRemove}>Remover</MenuItem>
      </Menu>
    </ListItem>
  );
};
