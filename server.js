import app from "./src/app.js";
import mongoose from "mongoose";

// connect to mongodb database
mongoose.connect("", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// launch app on port 3000
app.listen(3000, () => {
  console.log("Running on port 3000");
});
