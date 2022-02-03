import React from "react";

export default function ToDo({ todo, changeStatus }) {
  function handler() {
    changeStatus(todo._id);
  }

  return (
    <>
      <div>
        <input
          type="checkbox"
          onChange={handler}
          checked={todo.isCompleted}
        />
        <label data-content={todo.text}>
          {todo.text}
        </label>
      </div>
    </>
  );
}
