function createStore(initialState) {
  let currentState = initialState;
  const listeners = new Set();
  return {
    getState: () => currentState,
    setState: (payload) => {
      const newState = { ...currentState };
      const { key, value } = payload;
      newState[key] = value;
      currentState = newState;
      emitChanges(listeners);
    },
    resetStore: () => {
      currentState = initialState;
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

function emitChanges(listeners) {
  listeners.forEach((listener) => {
    /*
       The store changed. Check if the snapshot changed since the last time we
         read from the store.
    if (checkIfSnapshotChanged(inst)) {
        Force a re-render.
    }
    */
    listener();
  });
}
const store = createStore({
  sand: 0,
  cement: 0,
});

export default store;
