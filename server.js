import app from "./src/app.js";
import dotenv from "dotenv";

// load environment variables
dotenv.config({ path: `./.env` });


// launch app on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
