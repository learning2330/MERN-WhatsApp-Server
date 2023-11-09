import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";

// dotenv config
dotenv.config();

// Create express app
const app = express();

// Morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Helmet
app.use(helmet());

// Parse json request body
app.use(express.json());

// Parse json request url
app.use(express.urlencoded({ extended: true }));

// Sentize request data
app.use(ExpressMongoSanitize());

// Enable cookie paeser
app.use(cookieParser());

// Gzip comression
app.use(compression());

// File upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Cors
app.use(cors());

app.post("/test", (req, res) => {
  throw createHttpError.BadRequest("This route has an error");
});

app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist."));
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;
