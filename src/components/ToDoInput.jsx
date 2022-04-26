import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const ToDoInput = ({ tasks, setTasks, isDisplayed, setIsDisplayed }) => {
  const [displayBackground, setDisplayBackground] = useState(
    isDisplayed ? "url(./icons/arrow-down.png)" : "url(./icons/arrow-up.png)"
  );

  const userInput = useRef();

  const sendToDB = async (object) => {
    await fetch("http://localhost:5000/save", {
      method: "post",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const addTask = async (e) => {
    e.preventDefault();
    const name = userInput.current.value;
    if (name === "") return;
    const object = {
      id: uuidv4(),
      text: name,
      completed: false,
      index: tasks.length + 1,
    };
    console.log(object);
    await sendToDB(object);
    setTasks((prevTasks) => [...prevTasks, object]);
    userInput.current.value = "";
  };

  useEffect(() => {
    setDisplayBackground(
      isDisplayed ? "url(./icons/arrow-down.png)" : "url(./icons/arrow-up.png)"
    );
  }, [isDisplayed]);
  return (
    <div className="top">
      <div className="display-button-container">
        <button
          className="display-button"
          onClick={() => {
            setIsDisplayed(!isDisplayed);
          }}
          style={{ backgroundImage: displayBackground }}
        ></button>
      </div>
      <form action="" className="todo-form" onSubmit={addTask}>
        <input
          type="text"
          ref={userInput}
          placeholder="What needs to be done?"
          onFocus={() => {setIsDisplayed(true)}}
        />
      </form>
    </div>
  );
};
export default ToDoInput;
