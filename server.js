import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import app from './src/app.js';

// Load environment variables
dotenv.config({ path: `./.env` });

// Create an Express application
const server = express();

// Enable CORS for all routes
server.use(cors({
  origin: process.env.CORS_URL, // Allow requests from this origin
  credentials: true, // Allow cookies to be sent with requests
}));

// Use the main app routes
server.use(app);

// Handle preflight requests
server.options('*', cors());

// Launch app on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
