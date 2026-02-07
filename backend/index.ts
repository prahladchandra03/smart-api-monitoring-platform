import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';
import endpointRoutes from './endpointRoutes';
import { startMonitoring } from './scheduler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/endpoints', endpointRoutes);

// Start the background monitoring job
startMonitoring();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});