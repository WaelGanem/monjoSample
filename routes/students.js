import express from 'express';
import { addStudent, fetchStudentsByName, updateStudent, deleteStudent, fetchAllStudents } from '../controllers/studentController.js';
import { getDb } from '../config/db.js';  // Import the DB connection

const router = express.Router();

// Add student
router.post('/students', (req, res) => {
    try {
        addStudent(req, res, getDb());
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
        console.error(error);
    }
});

// Fetch student by name
router.get('/students', (req, res) => {
    try {
        fetchStudentsByName(req, res, getDb());
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
        console.error(error);
    }
});

// Fetch all students
router.get('/allstudents', (req, res) => {
    try {
        fetchAllStudents(req, res, getDb());
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
        console.error(error);
    }
});

// Update student by ID
router.put('/students/:id', (req, res) => {
    try {
        updateStudent(req, res, getDb());
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
        console.error(error);
    }
});

// Delete student by ID
router.delete('/students/:id', (req, res) => {
    try {
        deleteStudent(req, res, getDb());
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
        console.error(error);
    }
});

export default router;
