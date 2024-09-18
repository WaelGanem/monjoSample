import {config} from 'dotenv';
import express, { json } from 'express';
import { MongoClient } from 'mongodb';
import { addStudent, fetchStudentsByName, updateStudent, deleteStudent, fetchAllStudents } from './controllers/studentController.js';

const app = express();

config();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGODB_URI;


app.use(json());

let db;

async function connectToMongo() {
    const client = new MongoClient(mongoUri);
    try {
      await client.connect();
      console.log('Connected to MongoDB Atlas');
      db = client.db('schoolDB');  // Change this if you have a different database name
    } catch (error) {
      console.error('MongoDB connection failed:', error);
    }
  }

  await connectToMongo(); 


app.get("/" , async(req,res)=>{
    res.send("Connected to Monjo");
})

// Use the addStudent function for the POST route
app.post('/students', async (req, res) => {
    try {
        await addStudent(req, res, db);  // The function handles the response
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
        console.error(error);
    }
});


// Retrieves the student using GET
app.get('/students', async (req, res) => {
    try {
        await fetchStudentsByName(req, res, db);  // Handle the fetching inside the controller
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
        console.error(error);
    }
});

// Get all students
app.get('/allstudents', async (req, res) => {
    try {
        await fetchAllStudents(req, res, db);  // Call the fetchAllStudents function
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
        console.error(error);
    }
});


// Updates the student's information after retrieving
app.put('/students/:id', async (req, res) => {
    try {
        await updateStudent(req, res, db);  // Call the updateStudent function
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
        console.error(error);
    }
});

app.delete('/students/:id', async (req, res) => {
    try {
        await deleteStudent(req, res, db);  // Call the deleteStudent function
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
        console.error(error);
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})