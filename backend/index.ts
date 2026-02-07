import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';
import endpointRoutes from './endpointRoutes';
import { startMonitoring } from './scheduler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:3000", "https://smart-api-monitoring-platform-1.onrender.com/"],
  
  credentials: true
}));
app.use(express.json());

app.use('/api/endpoints', endpointRoutes);

// Connect to Database first, then start Server
connectDB().then(() => {
  // Start the background monitoring job
  startMonitoring();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});