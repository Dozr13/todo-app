import { useCallback, useState } from "react";
import { Task } from "../interfaces/interfaceProps";
import { ModalMode } from "../types/types";

export const useModal = () => {
  const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.Closed);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const openModal = useCallback((mode: ModalMode, task: Task) => {
    setModalMode(mode);
    setSelectedTask(task);
  }, []);

  const closeModal = useCallback(() => {
    setModalMode(ModalMode.Closed);
    setSelectedTask(null);
  }, []);

  return { modalMode, openModal, closeModal, selectedTask };
};
