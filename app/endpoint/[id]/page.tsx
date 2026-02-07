import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Data from backend looks like:
// [{ createdAt: '10:00', responseTime: 120 }, { createdAt: '11:00', responseTime: 145 }]

export const ResponseTimeChart = ({ data }: { data: any[] }) => (
  <div className="h-64 w-full bg-white p-4 rounded-lg shadow">
    <h3 className="text-gray-500 text-sm mb-4">Response Time (ms)</h3>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="createdAt" hide />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="responseTime" 
          stroke="#2563eb" 
          strokeWidth={2} 
          dot={false} 
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);