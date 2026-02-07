"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, CheckCircle, AlertCircle, Plus, RefreshCcw, Server, ArrowUpCircle, ArrowDownCircle, Trash2, Clock } from 'lucide-react';
import AddApiModal from '../components/AddApiModal'; 
import Pricing from './Pricing'; 
import Footer from './Footer';

// Types matching our Backend
interface Endpoint {
  _id: string;
  name: string;
  url: string;
  method: string;
  frequency: number;
  status: 'active' | 'paused';
  lastRun?: string;
  healthStatus?: 'UP' | 'DOWN';
  latency?: number;
}

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Dashboard() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch APIs from Backend
  useEffect(() => {
    fetchEndpoints();
  }, []);

  // Calculate Stats
  const total = endpoints.length;
  const up = endpoints.filter(e => e.healthStatus === 'UP').length;
  const down = endpoints.filter(e => e.healthStatus === 'DOWN').length;

  const fetchEndpoints = async () => {
    setIsRefreshing(true);
    try {
      // Assuming Backend is running on port 3000
      const res = await axios.get(`${API_BASE_URL}/api/endpoints`); 
      setEndpoints(res.data);
    } catch (err) {
      console.error("Failed to fetch", err);
    } finally {
      setLoading(false);
      setTimeout(() => setIsRefreshing(false), 600); // Visual delay
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure you want to delete this monitor?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/endpoints/${id}`);
      fetchEndpoints(); // Refresh list
    } catch(err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 1. Dashboard Section */}
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Activity className="text-blue-600" /> Smart API Monitor
          </h1>
          <div className="flex gap-3">
            <button 
              onClick={fetchEndpoints}
              className="bg-white text-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 border border-gray-200 transition shadow-sm"
            >
              <RefreshCcw size={18} className={isRefreshing ? "animate-spin" : ""} /> Refresh
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-sm"
            >
              <Plus size={18} /> Monitor New API
            </button>
          </div>
        </div>

        {/* Status Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
               <p className="text-gray-500 text-sm font-medium">Total Monitored</p>
               <h2 className="text-3xl font-bold text-gray-800 mt-1">{total}</h2>
             </div>
             <div className="p-3 bg-blue-50 rounded-full">
               <Server className="text-blue-600" size={24} />
             </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
               <p className="text-gray-500 text-sm font-medium">Operational (UP)</p>
               <h2 className="text-3xl font-bold text-green-600 mt-1">{up}</h2>
             </div>
             <div className="p-3 bg-green-50 rounded-full">
               <ArrowUpCircle className="text-green-600" size={24} />
             </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
               <p className="text-gray-500 text-sm font-medium">Downtime (DOWN)</p>
               <h2 className="text-3xl font-bold text-red-600 mt-1">{down}</h2>
             </div>
             <div className="p-3 bg-red-50 rounded-full">
               <ArrowDownCircle className="text-red-600" size={24} />
             </div>
          </div>
        </div>

        {/* Grid of Monitored APIs */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading Dashboard...</div>
        ) : endpoints.length === 0 ? (
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
                  {api.healthStatus === 'DOWN' ? (
                    <AlertCircle className="text-red-500" size={20} />
                  ) : (
                    <CheckCircle className="text-green-500" size={20} />
                  )}
                </div>
                
                <p className="text-sm text-gray-500 truncate mb-4 font-mono bg-gray-50 p-2 rounded">{api.url}</p>
                
                <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-4">
                  <div className="flex items-center gap-4">
                    <span className="bg-gray-100 px-2 py-1 rounded font-medium text-gray-600">
                      Every {api.frequency}m
                    </span>
                    <span className="flex items-center gap-1" title="Response Time">
                      <Clock size={14} /> {api.latency ? `${api.latency}ms` : '-'}
                    </span>
                    <span>Last: {api.lastRun ? new Date(api.lastRun).toLocaleTimeString() : 'Never'}</span>
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(api._id); }}
                    className="text-gray-400 hover:text-red-600 transition"
                    title="Delete Monitor"
                  >
                    <Trash2 size={16} />
                  </button>
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

      <Footer />
      
      {/* Modal */}
      {isModalOpen && <AddApiModal onClose={() => setIsModalOpen(false)} refresh={fetchEndpoints} />}
    </div>
  );
}