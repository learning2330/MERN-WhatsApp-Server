import mongoose from "mongoose";
import app from "./app.js";
import Logger from "./configs/logger.js";

// env variable
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

// exit on mongo error
mongoose.connection.on("error", (err) => {
  Logger.error(`MongoDB connected error : ${err}`);
  process.exit(1);
});

// Mongodb debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

// Connect MongoDB
mongoose.connect(DB_URL);

let server;

server = app.listen(PORT, () => {
  Logger.info(`Server is listening at ${PORT}...`);
});

// Handle Server Error
const exitHandler = () => {
  if (server) {
    Logger.info("Server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  Logger.error(error);
  exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    Logger.info("Server closed.");
    process.exit(1);
  }
});
