import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { StrictModeDroppable } from "./StrictModeDroppable";

const DeleteArea = () => {
  return (
    <StrictModeDroppable droppableId="delete-area">
      {(provided) => {
        return (
          <Box {...provided.droppableProps} ref={provided.innerRef}>
            <Tooltip title="Drag and drop to delete a task">
              <IconButton
                color="error"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <DeleteIcon sx={{ fontSize: 50 }} />
                <Typography variant="overline">Delete Task</Typography>
              </IconButton>
            </Tooltip>
            <Box style={{ display: "none" }}>{provided.placeholder}</Box>
          </Box>
        );
      }}
    </StrictModeDroppable>
  );
};

export default DeleteArea;
