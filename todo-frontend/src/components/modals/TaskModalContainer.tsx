import { Box, Modal } from "@mui/material";
import { TaskModalContainerProps } from "../../interfaces/interfaceProps";
import { ModalMode } from "../../types/types";
import TaskModal from "./TaskModal";

const TaskModalContainer = ({
  modalMode,
  task,
  handleSaveTask,
  handleDelete,
  closeModal,
}: TaskModalContainerProps) => {
  return (
    <Modal open={modalMode !== ModalMode.Closed} onClose={closeModal}>
      <Box
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
        }}
      >
        <TaskModal
          mode={modalMode}
          task={task!}
          onSave={handleSaveTask}
          onDelete={handleDelete}
          onClose={closeModal}
        />
      </Box>
    </Modal>
  );
};

export default TaskModalContainer;
