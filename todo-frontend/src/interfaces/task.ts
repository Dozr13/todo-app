import {
  DraggableProvided,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { ModalMode } from "../types/types";

export interface AddOrCopyAreaProps {
  isDragging: boolean;
  onAddClick: () => void;
}

export interface DateSelectorProps {
  children: React.ReactNode;
}

export interface DeleteAccountButtonProps {
  onDelete: () => Promise<void>;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "pending" | "in-progress" | "completed";
}

export interface TaskAreaProps {
  tasks: Task[];
  renderTaskItem: (task: Task, provided: DraggableProvided) => JSX.Element;
}

export interface TaskListItemProps {
  task: Task;
  onClick: (task: Task) => void;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => Promise<void>;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  provided: DraggableProvided;
}

export interface TaskModalContainerProps {
  modalMode: ModalMode;
  task: Task | null;
  handleSaveTask: (task: Task) => Promise<void>;
  handleDelete: () => Promise<void>;
  closeModal: () => void;
}

export interface TaskModalProps {
  mode: ModalMode;
  task: Task;
  onSave: (task: Task) => void;
  onDelete: () => void;
  onClose: () => void;
}
export interface useTaskOperationsProps {
  fetchTasks: () => Promise<void>;
}
