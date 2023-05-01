const generateRandomString = (len) => {
  let str = "";
  const aplhabets = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < len; i++) {
    const randomIndex = parseInt(Math.random() * 10);
    str += aplhabets[randomIndex];
  }

  return str;
};

async function getSearchResults(input) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [];

      for (let i = 0; i < 5; i++) {
        results.push(`${input}${generateRandomString(5)}`);
      }
      resolve(results);
    }, 100);
  });
}

module.exports = {
  getSearchResults,
};
