import { Task } from "../interfaces/interfaceProps";

export const newTaskTemplate = (): Task => ({
  _id: "",
  title: "",
  description: "",
  dueDate: new Date(),
  status: "pending",
});

export const updateTaskOrder = (
  tasks: Task[],
  result: any,
  handleTaskOrderUpdate: (taskIds: string[]) => void,
): void => {
  const reorderedTasks = Array.from(tasks);
  const [removed] = reorderedTasks.splice(result.source.index, 1);
  reorderedTasks.splice(result.destination.index, 0, removed);
  handleTaskOrderUpdate(reorderedTasks.map((t) => t._id));
};

export const createHandleSaveTask =
  (
    modalMode: string,
    handleAddTask: (task: Task) => Promise<void>,
    handleUpdateTask: (task: Task) => Promise<void>,
    showSuccessSnackbar: (message: string) => void,
    showErrorSnackbar: (message: string) => void,
    closeModal: () => void,
  ) =>
  async (task: Task) => {
    try {
      if (modalMode === "add" || modalMode === "duplicate") {
        await handleAddTask({ ...task, _id: "" });
      } else {
        await handleUpdateTask(task);
      }
      showSuccessSnackbar("Task processed successfully");
    } catch (error) {
      showErrorSnackbar("An error occurred, please try again later.");
    } finally {
      closeModal();
    }
  };

export const createHandleDelete =
  (
    selectedTask: Task | null,
    handleDeleteTask: (taskId: string) => Promise<void>,
    showSuccessSnackbar: (message: string) => void,
    showErrorSnackbar: (message: string) => void,
    closeModal: () => void,
  ) =>
  async () => {
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
