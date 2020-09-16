const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value!`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;

  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired. Please log in again!", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    errorName: err.name,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // ! Operational, Trusted Error: send message to client.
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // ! Programming or other unknown error: don't leak error details.
  } else {
    // 1) Log error
    console.error("ERROR 💥:", err);

    // 2) Send generic message
    res.status(500).json({
      // * 500 - Internal Server Error.
      status: "error",
      message: "something went very wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack); //Error stack show the origination of error.  //to reproduce localhost:3000/api/v1/blob and check console.

  err.statusCode = err.statusCode || 500; //500 - internal server error.
  err.status = err.status || "error";

  // * ERROR based on development / production
  if (process.env.NODE_ENV === "development") sendErrorDev(err, res);
  else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err); // creating a deep copy of err. So that we can modify it as needed.
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
