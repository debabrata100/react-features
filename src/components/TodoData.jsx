import React from "react";
import fetchData from "../common/fetchTodoData";

const resource = fetchData();
const TodoData = () => {
  const todoList = resource.read();

  return (
    <div>
      <h2>List of Todos</h2>
      <ul>
        {todoList.map(({ id, value }) => (
          <li key={id}>{value}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoData;
