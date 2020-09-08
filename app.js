const express = require("express");

//routers
const quoteRouter = require("./routes/quoteRouter");
const characterRouter = require("./routes/characterRouter");

const app = express();

app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/quote", quoteRouter);
app.use("/api/v1/character", characterRouter);

module.exports = app;
