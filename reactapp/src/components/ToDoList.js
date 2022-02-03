import React from "react";
import ToDo from "./ToDo";


export default function ToDoList({ todos, changeStatus }) {
  return (
    <ul>
      {todos.map((todo) => (
        <ToDo key={todo._id} todo={todo} changeStatus={changeStatus}/>
      ))}
    </ul>
  );
}
