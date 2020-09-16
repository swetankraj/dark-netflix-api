const express = require("express");
const morgan = require("morgan");

//security modules
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp"); //http parameter polution

//routers
const quoteRouter = require("./routes/quoteRouter");
const characterRouter = require("./routes/characterRouter");
const episodeRouter = require("./routes/episodeRouter");
const userRouter = require("./routes/userRouter");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
//Initialization
const app = express();

//* Set security HTTP headers
app.use(helmet());

//* Development login
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

//* Limit requests from same IP
const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000, //100 requests per IP per hour. (minutes, seconds, milliseconds)
  message: "Too many request from this IP, pleasse try again in an hour",
});
app.use("/api", limiter);

//* Body parser, reading data from body to req.body
app.use(express.json({ limit: "10kb" })); //Rate limiter, if body has data more than 10kb it will not be parsed

//* Data Sanittization against NoSQL query injection
app.use(mongoSanitize());

//* Data sanitization against XSS(cross site scripting attacks)
app.use(xss());

app.use(
  hpp({
    whitelist: ["season", "name", "author"],
  })
);

app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/quote", quoteRouter);
app.use("/api/v1/character", characterRouter);
app.use("/api/v1/episode", episodeRouter);

//* For Admin
app.use("/api/v1/user", userRouter);

//* Handles all unknown routes.
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Express in built middleware error handlers
app.use(globalErrorHandler);

module.exports = app;
