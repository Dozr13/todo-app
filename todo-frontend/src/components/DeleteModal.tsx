import { Box, Button, Typography } from "@mui/material";
import { forwardRef } from "react";

interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const DeleteModal = forwardRef<HTMLDivElement, DeleteModalProps>(
  ({ onClose, onConfirm, message }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 4,
          minWidth: 300,
          maxWidth: 600,
          borderRadius: 2,
          boxShadow: 24,
          overflowY: "auto",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Confirm Delete
        </Typography>
        <Typography>{message}</Typography>
        <Box display="flex" justifyContent="space-evenly" mt={4}>
          <Button variant="outlined" color="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onConfirm} autoFocus>
            Confirm
          </Button>
        </Box>
      </Box>
    );
  },
);

DeleteModal.displayName = "DeleteModal";

export default DeleteModal;
