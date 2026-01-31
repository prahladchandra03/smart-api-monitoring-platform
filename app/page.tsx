"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import AddApiModal from '@/components/AddApiModal'; // Ensure path is correct
import Pricing from '../components/Pricing'; // Ensure path is correct

// Types matching our Backend
interface Endpoint {
  _id: string;
  name: string;
  url: string;
  method: string;
  status: 'active' | 'paused';
  lastRun?: string;
}

export default function Dashboard() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch APIs from Backend
  useEffect(() => {
    fetchEndpoints();
  }, []);

  const fetchEndpoints = async () => {
    try {
      // Assuming Backend is running on port 3000
      const res = await axios.get('http://localhost:3000/api/endpoints'); 
      setEndpoints(res.data);
    } catch (err) {
      console.error("Failed to fetch", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 1. Dashboard Section */}
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Activity className="text-blue-600" /> API Sentinel
          </h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-sm"
          >
            <Plus size={18} /> Monitor New API
          </button>
        </div>

        {/* Grid of Monitored APIs */}
        {endpoints.length === 0 ? (
          // Empty State (Agar koi API nahi hai)
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No APIs monitored yet.</p>
            <button onClick={() => setIsModalOpen(true)} className="text-blue-600 font-medium hover:underline">
              Add your first API
            </button>
          </div>
        ) : (
          // API Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {endpoints.map((api) => (
              <div key={api._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{api.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded uppercase font-bold ${
                      api.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                      api.method === 'POST' ? 'bg-green-100 text-green-700' :
                      api.method === 'DELETE' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {api.method}
                    </span>
                  </div>
                  {/* Status Indicator */}
                  <CheckCircle className="text-green-500" size={20} />
                </div>
                
                <p className="text-sm text-gray-500 truncate mb-4 font-mono bg-gray-50 p-2 rounded">{api.url}</p>
                
                <div className="flex justify-between items-center text-xs text-gray-400 border-t pt-4">
                  <span>Freq: Every 1h</span>
                  <span>Last: {api.lastRun ? new Date(api.lastRun).toLocaleTimeString() : 'Never'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Separator Line */}
      <hr className="border-gray-200 my-8" />

      {/* 2. Pricing Section (Added Here) */}
      <div className="bg-white pb-10">
        <Pricing />
      </div>
      
      {/* Modal */}
      {isModalOpen && <AddApiModal onClose={() => setIsModalOpen(false)} refresh={fetchEndpoints} />}
    </div>
  );
}