import ToDoList from "./components/ToDoList.js";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([]);

  const firstUpdate = useRef(true);

  // Fetch To-do list from the backend node API
  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((jsonResponse) => {
        setTodos((prevTodos) => {
          return [...prevTodos, ...jsonResponse];
        });
      });
  }, []);

  //   // Send To-do list to the backend node API
  //   useEffect(() => {
  //     if (firstUpdate.current) {
  //     firstUpdate.current = false;
  //     return;
  //   }
  //   console.log("Request Made!");
  //   async function updatePost() {
  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(todos),
  //     };
  //     const response = await fetch(
  //       "http://localhost:5000/todos",
  //       requestOptions
  //     );
  //     const data = await response.json();
  //   }
  //   updatePost();
  // }, [todos]);

  const todoName = useRef();

  const handler = (e) => (e.key === "Enter" ? addTodo() : null);

  function addTodo() {
    if (todoName.current.value === "") return;
    const todo = { text: todoName.current.value, isCompleted: false };
    setTodos((prevTodos) => {
      return [...prevTodos, todo];
    });
    todoName.current.value = "";
    axios
      .post("http://localhost:5000/todos", todo)
      .then(() => console.log("New todo sent successfully!"));
  }

  function changeStatus(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo._id === id);
    todo.isCompleted = !todo.isCompleted;
    setTodos(newTodos);

    axios
      .put("http://localhost:5000/todos", todo)
      .then(() => console.log("Updated todo sent successfully!"));
  }

  function removeTodo() {
    const toBeDeleted = todos.filter((todo) => todo.isCompleted === true);
    const newTodos = todos.filter((todo) => todo.isCompleted === false);
    setTodos(newTodos);

    const json = JSON.stringify(toBeDeleted);
    console.log("Deleting the todos: ", json);
    axios
      .delete("http://localhost:5000/todos", {
        headers: {
          "Content-Type": "application/json",
        },
        data: json,
      })
      .then(() => console.log("Delete request sent successfully!"));
  }

  return (
    <>
      <h2>To Do List:</h2>
      <ToDoList todos={todos} changeStatus={changeStatus} />
      <div className="form__group field">
        <input
          ref={todoName}
          type="input"
          className="form__field"
          id="name"
          onKeyDown={handler}
        />
        <label className="form__label">To Do</label>
        <button onClick={addTodo} id="getTodo" type="submit">
          Add
        </button>
        <button onClick={removeTodo} id="removeCompleted" type="button">
          Remove Selected
        </button>
      </div>

      <Link style={styling} to="/about">
        {" "}
        About{" "}
      </Link>
    </>
  );
}

const styling = {
  color: "Red",
};

export default App;
