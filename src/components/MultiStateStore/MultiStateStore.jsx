import React, { useSyncExternalStore } from "react";
import store from "./store";

export default function MultiStateStore() {
  const { sand, cement } = useSyncExternalStore(
    store.subscribe,
    store.getState
  );
  const isCorrectProportion = sand / cement === 4 / 3;

  const onAddSand = () => {
    store.setState({
      key: "sand",
      value: sand + 1,
    });
  };
  const onAddCement = () => {
    store.setState({
      key: "cement",
      value: cement + 1,
    });
  };

  return (
    <div>
      <h2>Balance Sand and Cement Proportion with 4:3</h2>
      {isCorrectProportion && <span>Congratulations! You made it right.</span>}
      <ul>
        <li>
          <span>Sand: {sand}</span> <button onClick={onAddSand}>Add </button>
        </li>
        <li>
          <span>Cement: {cement}</span>
          <button onClick={onAddCement}>Add </button>
        </li>
      </ul>
    </div>
  );
}
