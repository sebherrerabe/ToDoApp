import React, { useRef, useState } from "react";

const ToDoItem = ({ task, tasks, setTasks, provided }) => {
  const taskInput = useRef();
  const checkbox = useRef();
  const [taskInputValue, setInputValue] = useState(task.text);
  const [isChecked, setIsChecked] = useState(task.completed);

  const updateTaskfromDB = async () => {
    const object = {
      id: task.id,
      text: taskInputValue,
      completed: !isChecked,
    };
    await fetch("http://localhost:5000/update", {
      method: "post",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.error("Error:", error);
    });
  };

  const deleteTaskfromDB = async () => {
    await fetch("http://localhost:5000/delete", {
      method: "post",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.error("Error:", error);
    });
  };

  const saveInputValue = async (e) => {
    e.preventDefault();
    await updateTaskfromDB();
    setTasks((previoustasks) =>
      previoustasks.map((item) => {
        if (item.id === task.id) {
          item.text = taskInputValue;
        }
        return item;
      })
    );
    taskInput.current.blur();
  };

  const handleChecked = async (e) => {
    e.preventDefault();
    await updateTaskfromDB();
    setTasks((previoustasks) => {
      let newArray = previoustasks.map((item) => {
        if (item.id === task.id) {
          item.completed = !item.completed;
        }
        return item;
      });
      return newArray;
    });
  };

  const deleteTask = async () => {
    await deleteTaskfromDB();
    setTasks(tasks.filter((item) => item.id !== task.id));
  };

  return (
    <li
      className="todo-item"
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <label className="wrapper">
        <input
          ref={checkbox}
          type="checkbox"
          checked={isChecked}
          onChange={async (e) => {
            setIsChecked(!isChecked);
            await handleChecked(e);
          }}
        />
        <svg
          className={`checkmark ${isChecked ? "checkmark--active" : ""}`}
          aria-hidden="true"
          viewBox="0 0 15 11"
          fill="none"
        ></svg>
      </label>
      <form action="" onSubmit={saveInputValue} className="task-form">
        <input
          type="text"
          className="task-input"
          ref={taskInput}
          value={taskInputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      <span className="X" onClick={deleteTask}>
        ✖
      </span>
    </li>
  );
};

export default ToDoItem;
