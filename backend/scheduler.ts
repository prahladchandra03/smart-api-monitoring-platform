import cron from 'node-cron';
import axios from 'axios';
import Endpoint from './Endpoint';

export const startMonitoring = () => {
  console.log('🕒 Monitoring Service Started...');

  // Schedule task to run every minute
  cron.schedule('* * * * *', async () => {
    console.log('🔍 Checking APIs status...');
    
    try {
      // Find all active endpoints
      const endpoints = await Endpoint.find({ status: 'active' });

      for (const api of endpoints) {
        // Check if it's time to run based on frequency (in minutes)
        const now = new Date();
        const lastRun = api.lastRun ? new Date(api.lastRun) : new Date(0);
        const intervalMs = (api.frequency || 1) * 60 * 1000;

        // Agar abhi time nahi hua hai, to skip karo
        if (now.getTime() - lastRun.getTime() < intervalMs) continue;

        try {
          const start = Date.now();
          await axios.get(api.url, { timeout: 5000 });
          const duration = Date.now() - start;
          console.log(`✅ UP: ${api.name} (${duration}ms)`);
          api.healthStatus = 'UP';
          api.latency = duration;
        } catch (error) {
          console.log(`❌ DOWN: ${api.name}`);
          api.healthStatus = 'DOWN';
        } finally {
          api.lastRun = new Date();
          await api.save();
        }
      }
    } catch (err) {
      console.error("Scheduler Error:", err);
    }
  });
};