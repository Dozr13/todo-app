import { useCallback, useState } from "react";
import { Task } from "../interfaces/task";

export enum ModalMode {
  Closed,
  Add,
  Edit,
  Delete,
}

export const useModal = () => {
  const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.Closed);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  const openModal = useCallback((mode: ModalMode, task?: Task) => {
    setModalMode(mode);
    setSelectedTask(task);
  }, []);

  const closeModal = useCallback(() => {
    setModalMode(ModalMode.Closed);
    setSelectedTask(undefined);
  }, []);

  return {
    modalMode,
    openModal,
    closeModal,
    selectedTask,
  };
};
