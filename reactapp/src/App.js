import ToDoList from "./components/ToDoList.js";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch To-do list from the backend node API whenever the page renders
  useEffect(() => {
    // Making a GET request
    axios.get("http://localhost:5000/todos").then((res) => {
      const readTodos = res.data;
      setTodos((prevTodos) => {
        return [...prevTodos, ...readTodos];
      });
    });
  }, []);

  const todoName = useRef();

  const handler = (e) => (e.key === "Enter" ? addTodo() : null);

  // Function that updates the state of Todos in the front end
  // and also sends a post request to create given Todos in the databse
  function addTodo() {
    if (todoName.current.value === "") return;
    const dummyTodo = { text: todoName.current.value, isCompleted: false };

    // Making a POST request
    axios.post("http://localhost:5000/todos", dummyTodo).then((res) => {
      // Upon success, we retrieve the data from the node API and update our current Todos
      // This little trick is used so that we can get the IDs of each individual Todo from the database and
      // and set the Todo to that unique ID in the React front end too
      const todo = res.data;
      setTodos((prevTodos) => {
        return [...prevTodos, todo];
      });
      todoName.current.value = "";
    });
  }

  // Function for updation of a Todo
  function changeStatus(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo._id === id);
    todo.isCompleted = !todo.isCompleted;
    setTodos(newTodos);

    // Making a PUT request
    axios
      .put("http://localhost:5000/todos", todo)
      .then((res) => console.log(res.data));
  }

  // Function that removes completed Todos from both the front and the back end
  function removeTodo() {
    const toBeDeleted = todos.filter((todo) => todo.isCompleted === true);
    const newTodos = todos.filter((todo) => todo.isCompleted === false);
    setTodos(newTodos);

    // Making a DELETE request
    axios
      .delete("http://localhost:5000/todos", {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(toBeDeleted),
      })
      .then((res) => console.log(res.data));
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
        <button onClick={addTodo} id="addTodo" type="submit">
          Add
        </button>
        <button onClick={removeTodo} id="removeCompleted" type="button">
          Remove Selected
        </button>
      </div>

      <Link style={styling} to="/about">
        About
      </Link>
    </>
  );
}

const styling = {
  color: "#fe4828",
};

export default App;
