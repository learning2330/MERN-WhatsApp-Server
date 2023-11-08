import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";

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

app.get("/", (req, res) => {
  res.send("Hello Whatsapp");
});

export default app;
