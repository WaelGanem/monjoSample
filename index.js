import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { connectToMongo } from './config/db.js';  // MongoDB connection
import studentRoutes from './routes/students.js';  // Student routes

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
await connectToMongo();

// Routes
app.get("/", (req, res) => {
    res.send("Connected to MongoDB");
});

// Use the student routes
app.use('/', studentRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
