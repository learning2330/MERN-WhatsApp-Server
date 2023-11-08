import app from "./app.js";
import Logger from "./configs/logger.js";

// env variable
const PORT = process.env.PORT || 8000;
console.log(process.env.NODE_ENV);

app.listen(PORT, () => {
  Logger.info(`Server is listening at ${PORT}...`);
});
