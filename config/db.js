import { MongoClient } from 'mongodb';
import {config} from 'dotenv';

config();
const mongoUri = process.env.MONGODB_URI;
let db;

export const connectToMongo = async () => {
    const client = new MongoClient(mongoUri);
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        db = client.db('schoolDB');  // Change the database name if needed
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw error;
    }
};

export const getDb = () => {
    if (!db) {
        throw new Error('Database not connected!');
    }
    return db;
};