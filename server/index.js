const express = require("express");
const { getSearchResults } = require("./src/utils");
const cors = require("cors");

const app = express();

const PORT = 3001;
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send({
    message: "Visit /search to get your results",
  });
});

app.get("/search", async (req, res) => {
  if (req.query == "") {
    return res.send({ data: [] });
  }
  const searchRes = await getSearchResults(req.query.q);

  res.send({
    data: searchRes,
  });
});

app.listen(PORT, () => {
  console.log(` app listening on port ${PORT}`);
});
