//fetchData.js
import wrapPromise from "./wrapPromise";

async function fetchAsyncData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            id: 1,
            value: "Todo-1",
          },
          {
            id: 2,
            value: "Todo-2",
          },
          {
            id: 3,
            value: "Todo-3",
          },
        ],
      });
    }, 3000);
  });
}
function fetchData() {
  const promise = fetchAsyncData().then(({ data }) => data);

  return wrapPromise(promise);
}

export default fetchData;
