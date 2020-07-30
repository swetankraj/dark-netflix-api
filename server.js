const express = require("express");

const data = require("./data/quotes.json");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Dark-Netflix API.");
});

app.get("/quote", (req, res) => {
  res.status(200).json(data);
});

app.get("/quote/random", (req, res) => {
  const randomData = data[Math.floor(Math.random() * data.length)];
  console.log(randomData);
  res.status(200).json(randomData);
});

app.listen(5600);
