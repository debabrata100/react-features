let todoList = [];
let listeners = [];

const store = {
  addTodo: () => {
    const lastIndex = todoList.length - 1;
    todoList = [
      ...todoList,
      {
        id: lastIndex >= 0 ? todoList[lastIndex].id + 1 : 1,
        title: `Todo: #${lastIndex + 2}`,
      },
    ];
    emitChanges();
  },
  deleteTodo: (todoId) => {
    todoList = todoList.filter((t) => t.id != todoId);
    emitChanges();
  },
  subscribe: (listener) => {
    listeners = [...listeners, listener];
    return () => {
      listener = listeners.filter((l) => l != listener);
    };
  },
  getState: () => {
    return todoList;
  },
};

function emitChanges() {
  for (let listener of listeners) {
    if (listener) {
      listener();
    }
  }
}

export { store };
