import { Box, Button, Modal, Typography } from "@mui/material";
import { ModalMode, useModal } from "../../hooks/useModal";
import { useSnackbarActions } from "../../hooks/useSnackbarActions";
import { useTasks } from "../../hooks/useTasks";
import { Task } from "../../interfaces/task";
import TaskListItem from "./TaskListItem";
import TaskModal from "../modals/TaskModal";

const TaskList = () => {
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarActions();
  const {
    tasks,
    handleAddTask,
    handleDeleteTask,
    handleStatusChange,
    handleUpdateTask,
  } = useTasks();
  const { modalMode, openModal, closeModal, selectedTask } = useModal();

  const openAddTaskModal = () => {
    openModal(ModalMode.Add, {
      _id: "",
      title: "",
      description: "",
      dueDate: new Date(),
      status: "pending",
    });
  };

  const handleSaveTask = async (task: Task) => {
    try {
      if (modalMode === ModalMode.Add) {
        await handleAddTask(task);
        showSuccessSnackbar("Task added successfully");
      } else if (modalMode === ModalMode.Edit) {
        await handleUpdateTask(task);
        showSuccessSnackbar("Task updated successfully");
      }
    } catch (error) {
      showErrorSnackbar(
        "An error occurred while updating the task, please try again later.",
      );
    } finally {
      closeModal();
    }
  };

  const handleDeleteClick = (task: Task) => {
    openModal(ModalMode.Delete, task);
  };

  const handleDelete = async () => {
    if (selectedTask && selectedTask._id) {
      try {
        await handleDeleteTask(selectedTask._id);
        showSuccessSnackbar("Task deleted successfully");
      } catch (error) {
        showErrorSnackbar(
          "An error occurred while deleting the task, please try again later.",
        );
      } finally {
        closeModal();
      }
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" mb={2}>
        <Button variant="contained" onClick={openAddTaskModal}>
          Add a new task
        </Button>
      </Box>

      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskListItem
            key={task._id}
            task={task}
            onClick={() => openModal(ModalMode.Edit, task)}
            onDelete={() => handleDeleteClick(task)}
            onStatusChange={handleStatusChange}
          />
        ))
      ) : (
        <Box display="flex" justifyContent="center">
          <Typography variant="subtitle1">No tasks available</Typography>
        </Box>
      )}

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
            mode={
              modalMode === ModalMode.Add
                ? "add"
                : modalMode === ModalMode.Edit
                ? "edit"
                : "delete"
            }
            task={selectedTask!}
            onSave={handleSaveTask}
            onDelete={handleDelete}
            onClose={closeModal}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default TaskList;
