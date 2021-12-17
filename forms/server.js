const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/submit", (req, res) => {
  const { name, favoriteColor } = req.body;

  res.send(`I got you ${name}, your fav color is ${favoriteColor}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
