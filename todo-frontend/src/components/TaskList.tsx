import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import { useSnackbarActions } from "../hooks/useSnackbarActions";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../interfaces/task";
import DeleteModal from "./DeleteModal";
import TaskListItem from "./TaskListItem";
import TaskModal from "./TaskModal";

interface TaskListProps {
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onDeleteTask: (taskId: string) => Promise<void>;
}

const TaskList = ({ onStatusChange, onDeleteTask }: TaskListProps) => {
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarActions();
  const { tasks, handleAddTask, handleDeleteTask, handleUpdateTask } =
    useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [isAddMode, setIsAddMode] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const closeAllModals = () => {
    setIsModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedTask(undefined);
    setIsAddMode(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedTask(undefined);
  };

  const isTaskValid = (task: Task): boolean => {
    if (!task.title || !task.description || !task.dueDate) {
      showErrorSnackbar("All fields are required");
      return false;
    }
    return true;
  };

  const handleAddNewTask = async (newTask: Task) => {
    if (!isTaskValid(newTask)) return;
    await handleAddTask(newTask);
    showSuccessSnackbar("Task added successfully");
    closeAllModals();
  };

  const handleEdit = async (updatedTask: Task) => {
    if (!updatedTask.title) {
      showErrorSnackbar("Title is required");
      return;
    }
    await handleUpdateTask(updatedTask);
    showSuccessSnackbar("Task updated successfully");
    closeAllModals();
  };

  const handleDelete = async () => {
    if (selectedTask && selectedTask._id) {
      await handleDeleteTask(selectedTask._id);
      showSuccessSnackbar("Task deleted successfully");
      closeDeleteModal();
    }
  };

  const openAddTaskModal = () => {
    setSelectedTask({
      _id: "",
      title: "",
      description: "",
      dueDate: new Date(),
      status: "pending",
    });
    setIsAddMode(true);
    setIsModalOpen(true);
  };

  const handleOpenModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (task: Task, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedTask(task);
    setDeleteModalOpen(true);
  };

  if (!tasks) return <Box>No tasks available.</Box>;
  return (
    <Box>
      {tasks.map((task) => (
        <TaskListItem
          key={task._id}
          task={task}
          onClick={handleOpenModal}
          onDelete={(event) => handleOpenDeleteModal(task, event)}
        />
      ))}
      <Button variant="contained" onClick={openAddTaskModal}>
        Add
      </Button>
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)}>
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
              task={selectedTask!}
              onSave={isAddMode ? handleAddNewTask : handleEdit}
              isAddMode={isAddMode}
            />
          </Box>
        </Modal>
      )}
      {deleteModalOpen && (
        <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <DeleteModal
            onConfirm={handleDelete}
            onClose={() => setDeleteModalOpen(false)}
            message="Are you sure you want to remove this task?"
          />
        </Modal>
      )}
    </Box>
  );
};

export default TaskList;
