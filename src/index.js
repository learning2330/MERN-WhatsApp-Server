import app from "./app.js";
import Logger from "./configs/logger.js";

// env variable
const PORT = process.env.PORT || 8000;

let server;

server = app.listen(PORT, () => {
  Logger.info(`Server is listening at ${PORT}...`);
  console.log("process id", process.pid);
});

// Handle Server Error

const exitHandler = () => {
  if (server) {
    Logger.info("Server closed.");
    process.emit(1);
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
    Logger.info("Server Closed.");
    process.emit(1);
  }
});
