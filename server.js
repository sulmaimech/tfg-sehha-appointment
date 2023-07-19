import app from "./src/app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

// load environment variables
dotenv.config({ path: `./.env` });

// we connect to the database
const db = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

// connect to mongodb database
mongoose.connect(db, {});

// launch app on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
