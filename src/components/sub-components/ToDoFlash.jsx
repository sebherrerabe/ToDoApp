import React from "react";

const ToDoFlash = ({ flash }) => {
  return (
    <li className="todo-item">
      <p className="flash">{flash.text}</p>
    </li>
  );
};

export default ToDoFlash;
