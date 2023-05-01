import { useSyncExternalStore } from "react";

//https://react.dev/reference/react/useSyncExternalStore#subscribing-to-a-browser-api

function useWindowResize() {
  const size = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function subscribe(callback) {
    window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("resize", callback);
    };
  }

  function getSnapshot() {
    return `${window.innerWidth} X ${window.innerHeight}`;
  }
  function getServerSnapshot() {
    return `Sizes are not available on server side`;
  }
  return size;
}

export default function DisplaySize() {
  const size = useWindowResize();
  return (
    <div>
      <h2>Try Resizing the window</h2>
      <span>Window Size: {size}</span>
    </div>
  );
}
