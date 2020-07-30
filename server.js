const express = require("express");
const data = require("./data/quotes.json");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/index.html"));
});

app.get("/quote", (req, res) => {
  res.status(200).json(data);
});

app.get("/quote/random", (req, res) => {
  const randomData = data[Math.floor(Math.random() * data.length)];
  //   console.log(randomData);
  res.status(200).json(randomData);
});

app.listen(process.env.PORT || 8080);
