const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (error) => {
  console.log("⛏ Uncaught exception! API is Shutting down ...");
  console.log(error.name, error.message);
  console.log(error.stack);
  process.exit(1); //1 denotes error (unsuccessful)
});

const app = require("./app");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASS
);

mongoose
  .connect(DB, {
    //resolves depreciation warnings
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("⭐ Database Connection Successful!");
  });
//   .catch((error) => {
//     console.log(error);
//   });

const port = process.env.PORT || 4080;
const server = app.listen(port, () => {
  console.log(
    `⚡ API is running on port ${port}. Environment is ${app.get("env")}.`
  );
});

process.on("unhandledRejection", (error) => {
  console.log(error.name);
  console.log(error.message);
  console.log("🚩 Unhandled Rejection! API is Shutting down ...");
  server.close(() => {
    process.exit(1);
  });
});
