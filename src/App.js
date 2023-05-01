import React, { Suspense } from "react";
import TodoData from "./components/TodoData";
import "./App.css";
import DisplaySize from "./components/BrowserApiDemo/DisplaySize";
import CustomStore from "./components/CustomStore/CustomStore";
import MultiStateStore from "./components/MultiStateStore/MultiStateStore";
import NonBlockingUI from "./components/Transitions/NonBlockingUI";
import SuspenseEnabledRouter from "./components/SuspenseEnabledRouter/SuspenseEnabledRouter";
import DeferUiUpdate from "./components/DeferUiUpdate/DeferUiUpdate";

const PARAMS_MAP = {
  todoList: "todolist",
  browserApi: "browserapi",
  externalStore: "externalStore",
  multiStateStore: "multiStateStore",
  nonBlockingStateUpdate: "non-blocking-state-update",
  suspenseEnabledRouter: "suspense-enabled-router",
  deferUiUpdate: "defer-ui-update",
};
const NAVS = [
  {
    id: "todolist",
    title: "Suspense Example with Todo List",
  },
  {
    id: "useSyncExternalStore",
    title: "useSyncExternalStore",
    subNavs: [
      {
        id: "browserapi",
        title: "Subscribing to Browser Api",
      },
      {
        id: "externalStore",
        title: "Subscribe to an Single State external store(Todo List Example)",
      },
      {
        id: "multiStateStore",
        title: "Subscribe to Multi State external store",
      },
    ],
  },
  {
    id: "transitions",
    title: "Transitions",
    subNavs: [
      {
        id: "non-blocking-state-update",
        title: "Non Blocking State update",
      },
      {
        id: "suspense-enabled-router",
        title: "Building A Suspense Enabled Router",
      },
    ],
  },
  {
    id: "deferuiupdate",
    title: "useDeferedValue",
    subNavs: [
      {
        id: PARAMS_MAP.deferUiUpdate,
        title: "Defer Ui Update",
      },
    ],
  },
];

function NavComponent({ id, title }) {
  return (
    <div className="subnav">
      <button
        onClick={() => {
          const origin = document.location.origin;
          document.location.href = `${origin}?c=${id}`;
        }}
      >
        {title}
      </button>
    </div>
  );
}
function App() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  return (
    <div className="app">
      <h1>React 18 Features</h1>
      <div className="r18-demolist">
        <div className="api-list">
          {NAVS.map((nav) => {
            return nav.subNavs ? (
              <div key={nav.id}>
                <span className="nav-title">{nav.title}</span>
                {nav.subNavs.map((subNav) => {
                  return (
                    <div key={subNav.id}>
                      <NavComponent {...subNav} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <NavComponent key={nav.id} {...nav} />
            );
          })}
        </div>
        <div className="api-demo">
          {params.c === PARAMS_MAP.multiStateStore && <MultiStateStore />}
          {params.c === PARAMS_MAP.externalStore && <CustomStore />}
          {params.c === PARAMS_MAP.todoList && (
            <Suspense fallback={<div>Loading...</div>}>
              <TodoData />
            </Suspense>
          )}
          {params.c === PARAMS_MAP.browserApi && <DisplaySize />}
          {params.c === PARAMS_MAP.nonBlockingStateUpdate && <NonBlockingUI />}
          {params.c === PARAMS_MAP.suspenseEnabledRouter && (
            <SuspenseEnabledRouter />
          )}
          {params.c === PARAMS_MAP.deferUiUpdate && <DeferUiUpdate />}
        </div>
      </div>
    </div>
  );
}

export default App;
