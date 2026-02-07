"use client";
import { useState } from 'react';
import axios from 'axios';

export default function AddApiModal({ onClose, refresh }: { onClose: () => void, refresh: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    method: 'GET',
    frequency: 60
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Hardcoded userId for now (Phase 10 is Auth)
      await axios.post('http://localhost:5000/api/endpoints', {
        ...formData,
        userId: "65b2f...mock_user_id..." 
      });
      refresh(); // Reload list
      onClose();
    } catch (err) {
      alert('Error creating monitor');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Monitor New API</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              className="w-full border p-2 rounded mt-1" 
              placeholder="e.g. Payment Gateway"
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">URL</label>
            <input 
              className="w-full border p-2 rounded mt-1" 
              placeholder="https://api.myapp.com/v1/health"
              onChange={e => setFormData({...formData, url: e.target.value})}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Method</label>
              <select 
                className="w-full border p-2 rounded mt-1"
                onChange={e => setFormData({...formData, method: e.target.value})}
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
              </select>
            </div>
            <div className="flex-1">
               <label className="block text-sm font-medium text-gray-700">Freq (min)</label>
               <input 
                 type="number" 
                 className="w-full border p-2 rounded mt-1" 
                 defaultValue={60}
                 onChange={e => setFormData({...formData, frequency: Number(e.target.value)})}
               />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Start Monitoring
          </button>
          <button type="button" onClick={onClose} className="w-full text-gray-500 py-2">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}