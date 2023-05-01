import React, { useDebugValue, useSyncExternalStore } from "react";
import { store } from "./store";

export default function CustomStore() {
  const todoList = useSyncExternalStore(store.subscribe, store.getState);
  const onAddTodo = () => {
    store.addTodo();
  };
  const onDeleteTodo = (id) => {
    store.deleteTodo(id);
  };
  // useDebugValue is a React Hook that lets you add a label to a custom Hook in React DevTools.
  useDebugValue(todoList);
  return (
    <div>
      <h2>Todo Example using externalSyncStore</h2>
      <button onClick={onAddTodo}>Add Todo</button>
      <ul>
        {todoList.map(({ id, title }) => (
          <li key={id}>
            <span>{title}</span>
            <button type="danger" onClick={() => onDeleteTodo(id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
