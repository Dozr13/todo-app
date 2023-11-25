import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { AddOrCopyAreaProps } from "../../interfaces/task";

const AddOrCopyArea = ({ isDragging, onAddClick }: AddOrCopyAreaProps) => {
  return (
    <StrictModeDroppable droppableId="copy-area">
      {(provided) => (
        <Box {...provided.droppableProps} ref={provided.innerRef}>
          <Tooltip
            title={isDragging ? "Create a copy of this Task" : "Add a new Task"}
          >
            <IconButton
              onClick={onAddClick}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "& .MuiSvgIcon-root": {
                  color: "#2f60d3",
                  "&:hover": {
                    color: "#00249a",
                  },
                },
              }}
            >
              {isDragging ? (
                <ContentCopyIcon sx={{ fontSize: 50 }} />
              ) : (
                <AddCircleOutlineIcon sx={{ fontSize: 50 }} />
              )}
              <Typography variant="overline">
                {isDragging ? "Copy Task" : "Add Task"}
              </Typography>
            </IconButton>
          </Tooltip>
          <Box style={{ display: "none" }}>{provided.placeholder}</Box>
        </Box>
      )}
    </StrictModeDroppable>
  );
};

export default AddOrCopyArea;
