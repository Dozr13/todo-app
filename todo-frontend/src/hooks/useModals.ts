import { useCallback, useState } from "react";
import { Task } from "../interfaces/task";

const initialSelectedTask: Task | undefined = undefined;

export const useModal = (
  initialMode = false,
  initialSelectedTask = undefined,
) => {
  const [isModalOpen, setIsModalOpen] = useState(initialMode);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(
    initialSelectedTask,
  );
  const [isAddMode, setIsAddMode] = useState(initialMode);

  const openModal = useCallback((task: Task) => {
    setIsModalOpen(true);
    setIsAddMode(!task);
    setSelectedTask(task);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTask(undefined);
    setIsAddMode(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
    selectedTask,
    isAddMode,
  };
};
