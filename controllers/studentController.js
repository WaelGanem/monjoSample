import { ObjectId } from 'mongodb';


//POST route for adding a student:
export const addStudent = async (req, res, db) => {
    const student = req.body;

    if (!student.name || !student.age) {
        return res.status(400).send({ message: "Student must have a name and age" });
    }

    try {
        const collection = db.collection('students');
        const result = await collection.insertOne(student);
        res.status(201).send({ message: "Student added successfully", studentId: result.insertedId });
    } catch (error) {
        console.error('Error adding student:', error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

// GET route for retrieving students
export const fetchStudentsByName = async (req, res, db) => {
    const { name } = req.query;  // Get 'name' from the query string

    if (!name) {
        return res.status(400).send({ message: "Name query parameter is required" });
    }

    try {
        const collection = db.collection('students');
        const students = await collection.find({ name }).toArray();  // Find students with the matching name
        res.status(200).send(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Function that fetches the student then updates the information
export const updateStudent = async (req, res, db) => {
    const { id } = req.params;  // Get the student ID from the URL
    const updateData = req.body;  // The new data to update

    if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid student ID" });
    }

    try {
        const collection = db.collection('students');
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },  // Match the student by ID
            { $set: updateData }  // Update the student's info
        );

        if (result.matchedCount === 0) {
            return res.status(404).send({ message: "Student not found" });
        }

        res.status(200).send({ message: "Student updated successfully" });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// function that gets the student and deletes it if found
export const deleteStudent = async (req, res, db) => {
    const { id } = req.params;  // Get the student ID from the URL

    if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid student ID" });
    }

    try {
        const collection = db.collection('students');
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: "Student not found" });
        }

        res.status(200).send({ message: "Student deleted successfully" });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Fetches ALL the students
export const fetchAllStudents = async (req, res, db) => {
    try {
        const collection = db.collection('students');
        const students = await collection.find({}).toArray();  // Retrieve all students
        res.status(200).send(students);
    } catch (error) {
        console.error('Error fetching all students:', error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

