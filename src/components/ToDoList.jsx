import React from "react";
import ToDoItem from "./sub-components/ToDoItem";
import ToDoFlash from "./sub-components/ToDoFlash";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ToDoList = ({
  tasks,
  setTasks,
  categories,
  flashes,
  getCompleted,
  getLefts,
}) => {
  const handleOnDragEnd = async (result) => {
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };
  const toDoItem = (task, index) => {
    return (
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => (
          <ToDoItem
            provided={provided}
            key={task.id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
          />
        )}
      </Draggable>
    );
  };

  const all = categories[0];
  const active = categories[1];
  const completed = categories[2];
  const lefts = getLefts(tasks);
  const completeds = getCompleted(tasks);

  const chooseDisplay = () => {
    let display;
    if (tasks.length === 0) {
      display = <ToDoFlash flash={flashes[0]} />;
    } else {
      if (all.active) {
        display = tasks.map((task, index) => toDoItem(task, index));
      }
      if (active.active && lefts > 0) {
        display = tasks.map((task, index) => {
          if (!task.completed) {
            return toDoItem(task, index);
          } else return null;
        });
      } else if (active.active && lefts === 0) {
        display = <ToDoFlash flash={flashes[1]} />;
      }
      if (completed.active && completeds > 0) {
        display = tasks.map((task, index) => {
          if (task.completed) {
            return toDoItem(task, index);
          } else return null;
        });
      } else if (completed.active && completeds === 0) {
        display = <ToDoFlash flash={flashes[2]} />;
      }
    }
    return display;
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todolist">
        {(provided) => (
          <ul
            className="tasks-list mg-top10"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {chooseDisplay()}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ToDoList;
