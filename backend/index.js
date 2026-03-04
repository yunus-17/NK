import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Database connected to NK Engineering Hub.'))
    .catch(err => console.error('Database connection failed:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/enquiries', enquiryRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: "NK Engineering API is active and running." });
});

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Server is moving at royal speed on port: ${PORT}`);
});
