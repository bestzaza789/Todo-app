import { useState } from "react";
import bgDestopDark from "../images/bg-desktop-dark.jpg";
import bgDestopLight from "../images/bg-desktop-light.jpg";

import iconMoonDark from "../images/icon-moon.svg";
import iconSunLight from "../images/icon-sun.svg";

function Homepage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [todoCount, setTodoCount] = useState(0);
  const [filterType, setFilterType] = useState("all");

  function handleToggleMode() {
    setIsDarkMode(!isDarkMode);
  }

  const [todo, setTodo] = useState([]);
  const [todoText, setTodoText] = useState("");

  const handleTodoTextChange = (event) => {
    setTodoText(event.target.value);
  };

  const addTodo = (event) => {
    event.preventDefault();
    const newTodo = [...todo, { text: todoText, completed: false }];
    setTodo(newTodo);
    setTodoText("");
    setTodoCount(todoCount + 1);
  };

  const handleToggleCheckbox = (index) => {
    const newTodo = [...todo];
    newTodo[index].completed = !newTodo[index].completed;
    setTodo(newTodo);
    setTodoCount(todoCount + (newTodo[index].completed ? -1 : 1));
  };

  const handleDeleteChecked = () => {
    const newTodo = todo.filter((item) => !item.completed);
    setTodo(newTodo);
  };

  const filteredTodo = () => {
    switch (filterType) {
      case "active":
        return todo.filter((item) => !item.completed);
      case "completed":
        return todo.filter((item) => item.completed);
      default:
        return todo;
    }
  };

  const handleDeleteTodo = (index) => {
    const deletedItem = todo[index];
    const newTodo = todo.filter((_, i) => i !== index);
    setTodo(newTodo);

    if (!deletedItem.completed) {
      setTodoCount(todoCount - 1);
    }
  };

  return (
    <>
      <div
        className={`main-page flex relative w-screen h-screen flex flex-col justify-around items-center ${
          isDarkMode ? "bg-black" : "bg-white"
        } ${isDarkMode ? "dark-mode" : "light-mode"}`}
      >
        <img
          className="toggle-bg z-10 absolute w-full min-w-[1000px] top-0 h-1/3 md:h-1/3 "
          src={isDarkMode ? bgDestopDark : bgDestopLight}
          alt={isDarkMode ? "Dark Background" : "Light Background"}
        />

        <div className="main-container flex flex-col items-center z-30 relative">
          <div className="flex flex-row justify-between w-full">
            <div
              className={`head-title z-30 text-4xl my-[20px] ${
                isDarkMode ? "text-white" : "text-white"
              }`}
            >
              TODO
            </div>

            <img
              className="toggle-icon z-30 w-[40px] h-[40px] my-[20px]"
              src={isDarkMode ? iconSunLight : iconMoonDark}
              alt={isDarkMode ? "light icon" : "dark icon"}
              style={{ cursor: "pointer" }}
              onClick={handleToggleMode}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            />
          </div>

          <form>
            <div className="input-container z-30">
              <input
                id="todo-input"
                type="text"
                onChange={handleTodoTextChange}
                value={todoText}
                className={`text-[20px] w-[400px] md:w-[600px] m-[10px] p-[10px] border-[2px] border-solid border-[#7C8BA0] ${
                  isDarkMode ? "bg-slate-700 text-white" : "bg-white text-black"
                }`}
              />
            </div>
            <button onClick={addTodo}></button>
          </form>
          <ul
            className={`text-[20px] w-[400px] md:w-[600px] m-[10px] p-[10px] border-[2px] border-solid border-[#7C8BA0] ${
              isDarkMode ? "bg-slate-700 text-white" : "bg-white text-black"
            }`}
          >
            {filteredTodo().map((item, index) => (
              <li
                key={index}
                className={`todo-item ${item.completed ? "completed" : ""}`}
              >
                <div
                  className={`flex flex-row md:flex-row justify-between w-full border-b-[2px] border-solid border-[#7C8BA0] py-[5px]`}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggleCheckbox(index)}
                      className="w-[20px] h-[20px] rounded-full md:ml-[20px] md:mr-[40px]"
                    />
                    <span className={item.completed ? "crossed-out" : ""}>
                      {item.text}
                    </span>
                  </label>
                  <button
                    className="delete-button md:delete-button-visible"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    x
                  </button>
                </div>
              </li>
            ))}
            <div className="bar flex flex-row justify-between">
              <div className="counter">{todoCount} item left</div>
              <div className="filter-buttons hidden flex-row w-full md:justify-evenly  md:w-3/6 md:flex">
                <button
                  className={`filter-button ${
                    filterType === "all" ? "active" : ""
                  }`}
                  onClick={() => setFilterType("all")}
                >
                  All
                </button>
                <button
                  className={`filter-button ${
                    filterType === "active" ? "active" : ""
                  }`}
                  onClick={() => setFilterType("active")}
                >
                  Active
                </button>
                <button
                  className={`filter-button ${
                    filterType === "completed" ? "active" : ""
                  }`}
                  onClick={() => setFilterType("completed")}
                >
                  Completed
                </button>
              </div>
              <button
                className="remove-todo-button"
                onClick={handleDeleteChecked}
              >
                Clear Completed
              </button>
            </div>
          </ul>
          <div
            className={`filter-buttons flex border-[2px] text-[20px] border-solid border-[#7C8BA0] py-[5px] flex-row justify-around w-[400px] ${
              isDarkMode ? "bg-slate-700 text-white" : "bg-white text-black"
            } md:hidden`}
          >
            <button
              className={`filter-button ${
                filterType === "all" ? "active" : ""
              }`}
              onClick={() => setFilterType("all")}
            >
              All
            </button>
            <button
              className={`filter-button ${
                filterType === "active" ? "active" : ""
              }`}
              onClick={() => setFilterType("active")}
            >
              Active
            </button>
            <button
              className={`filter-button ${
                filterType === "completed" ? "active" : ""
              }`}
              onClick={() => setFilterType("completed")}
            >
              Completed
            </button>
          </div>
        </div>
        <div
          className={`attribution size-[11px] md:text-center z-30 flex flex-row justify-center items-center w-full ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by <a href="#">Chayaphon Phetlan</a>.
        </div>
      </div>
    </>
  );
}

export default Homepage;
