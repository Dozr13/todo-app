import { DropResult } from "react-beautiful-dnd";
import { Task } from "../interfaces/task";

export enum ModalMode {
  Closed = "closed",
  Add = "add",
  Edit = "edit",
  Delete = "delete",
  Duplicate = "duplicate",
}

export type HandleSaveTaskType = (
  modalMode: ModalMode,
  handleAddTask: (task: Task) => Promise<void>,
  handleUpdateTask: (task: Task) => Promise<void>,
  showSuccessSnackbar: (message: string) => void,
  closeModal: () => void,
) => (task: Task) => Promise<void>;

export type HandleDeleteType = (
  selectedTask: Task | null,
  handleDeleteTask: (taskId: string) => Promise<void>,
  showSuccessSnackbar: (message: string) => void,
  closeModal: () => void,
) => () => Promise<void>;

export type UpdateTaskOrderType = (
  tasks: Task[],
  result: DropResult,
  handleTaskOrderUpdate: (taskIds: string[]) => Promise<void>,
) => void;
