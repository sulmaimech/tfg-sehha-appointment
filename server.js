import app from "./src/app.js";
import dotenv from "dotenv";
import coes from "cors";
// load environment variables
dotenv.config({ path: `./.env` });

// CORS
app.use(coes());

// launch app on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
