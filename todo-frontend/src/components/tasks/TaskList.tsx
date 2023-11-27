import { Box, Divider } from "@mui/material";
import { useCallback, useState } from "react";
import {
  DragDropContext,
  DraggableProvided,
  DropResult,
} from "react-beautiful-dnd";
import { useModal } from "../../hooks/useModal";
import { useSnackbarActions } from "../../hooks/useSnackbarActions";
import { useTaskOperations } from "../../hooks/useTaskOperations";
import { useTasks } from "../../hooks/useTasks";
import { Task } from "../../interfaces/interfaceProps";
import { ModalMode } from "../../types/types";
import {
  createHandleDelete,
  createHandleSaveTask,
} from "../../utils/taskListUtils";
import AddOrCopyArea from "../dnd/AddOrCopyArea";
import DeleteArea from "../dnd/DeleteArea";
import TaskArea from "../dnd/TaskArea";
import TaskModalContainer from "../modals/TaskModalContainer";
import TaskListItem from "./TaskListItem";

const TaskList = () => {
  const { tasks, fetchTasks } = useTasks();
  const {
    handleAddTask,
    handleDeleteTask,
    handleUpdateTask,
    handleTaskOrderUpdate,
    handleStatusChange,
  } = useTaskOperations({ fetchTasks });
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarActions();
  const { modalMode, openModal, closeModal, selectedTask } = useModal();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const openAddTaskModal = useCallback(() => {
    openModal(ModalMode.Add, {
      _id: "",
      title: "",
      description: "",
      dueDate: new Date(),
      status: "pending",
    });
  }, [openModal]);

  const handleDragEnd = useCallback(
    async (result: DropResult) => {
      if (!result.destination) return;

      const taskId = result.draggableId;
      const task = tasks.find((task) => task._id === taskId);
      if (!task) return;

      if (result.destination.droppableId === "delete-area") {
        openModal(ModalMode.Delete, task);
      } else if (result.destination.droppableId === "copy-area") {
        openModal(ModalMode.Duplicate, { ...task, _id: "" });
      } else {
        const reorderedTasks = Array.from(tasks);
        const [removed] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, removed);

        handleTaskOrderUpdate(reorderedTasks.map((t) => t._id));
      }

      setIsDragging(false);
    },
    [tasks, openModal, handleTaskOrderUpdate],
  );

  const renderTaskItem = useCallback(
    (task: Task, provided: DraggableProvided) => {
      return (
        <TaskListItem
          task={task}
          onClick={() => openModal(ModalMode.Edit, task)}
          onStatusChange={handleStatusChange}
          dragHandleProps={provided.dragHandleProps}
          provided={provided}
        />
      );
    },
    [handleStatusChange, openModal],
  );

  return (
    <Box>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <AddOrCopyArea
            isDragging={isDragging}
            onAddClick={openAddTaskModal}
          />

          <DeleteArea />
        </Box>
        <Divider sx={{ my: 2 }} />
        <TaskArea tasks={tasks} renderTaskItem={renderTaskItem} />
      </DragDropContext>

      <TaskModalContainer
        modalMode={modalMode}
        task={selectedTask ?? null}
        handleSaveTask={createHandleSaveTask(
          modalMode,
          handleAddTask,
          handleUpdateTask,
          showSuccessSnackbar,
          showErrorSnackbar,
          closeModal,
        )}
        handleDelete={createHandleDelete(
          selectedTask,
          handleDeleteTask,
          showSuccessSnackbar,
          showErrorSnackbar,
          closeModal,
        )}
        closeModal={closeModal}
      />
    </Box>
  );
};

export default TaskList;
