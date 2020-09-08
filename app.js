const express = require("express");

//routers
const quoteRouter = require("./routes/quoteRouter");

const app = express();

app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/quote", quoteRouter);

module.exports = app;
