import { List } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { TaskAreaProps } from "../../interfaces/task";
import { StrictModeDroppable } from "./StrictModeDroppable";

const TaskArea = ({ tasks, renderTaskItem }: TaskAreaProps) => (
  <StrictModeDroppable droppableId="tasks">
    {(provided) => (
      <List {...provided.droppableProps} ref={provided.innerRef}>
        {tasks.map((task, index) => (
          <Draggable
            key={task._id}
            draggableId={task._id.toString()}
            index={index}
          >
            {(provided) => renderTaskItem(task, provided)}
          </Draggable>
        ))}
        {provided.placeholder}
      </List>
    )}
  </StrictModeDroppable>
);

export default TaskArea;
