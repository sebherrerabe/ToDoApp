import React from "react";
import { useEffect, useState } from "react";
import "./css/ToDoList.css";
import ToDoList from "./components/ToDoList";
import ToDoInput from "./components/ToDoInput";
import ToDoBottom from "./components/ToDoBottom";
import Header from "./components/Header";

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, handleCategories] = useState([
    { text: "All", active: true },
    { text: "Active", active: false },
    { text: "Completed", active: false },
  ]);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [flashes] = useState([
    { text: "You haven't added any tasks yet.", isCalled: false },
    { text: "You have completed all your tasks.", isCalled: false },
    { text: "You haven't completed any tasks yet.", isCalled: false },
  ]);

  const getFromDB = async () => {
    const response = await fetch("http://localhost:5000/get");
    const data = await response.json();
    data.sort((a, b) => a.index - b.index);
    setTasks(data);
  };

  useEffect(() => {
    getFromDB();
  }, []);

  const updateTaskfromDB = async (task, index) => {
    const object = {
      id: task.id,
      text: task.text,
      completed: task.completed,
      index: index + 1,
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

  useEffect(() => {
    tasks.forEach(async (task, index) => {
      await updateTaskfromDB(task, index);
    });
  }, [tasks]);
  const getLefts = () => {
    let lefts = 0;
    tasks.forEach((task) => {
      if (!task.completed) lefts++;
    });
    return lefts;
  };

  const getCompleted = () => {
    let completed = 0;
    tasks.forEach((task) => {
      if (task.completed) completed++;
    });
    return completed;
  };

  return (
    <div className="main">
      <Header />
      <div className="todo-list mg-top40">
        <ToDoInput
          tasks={tasks}
          setTasks={setTasks}
          isDisplayed={isDisplayed}
          setIsDisplayed={setIsDisplayed}
        />
        {isDisplayed ? (
          <>
            {
              <ToDoList
                tasks={tasks}
                setTasks={setTasks}
                categories={categories}
                flashes={flashes}
                getCompleted={getCompleted}
                getLefts={getLefts}
              />
            }
            <ToDoBottom
              tasks={tasks}
              categories={categories}
              handleCategories={handleCategories}
              getLefts={getLefts}
            />{" "}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ToDoApp;
