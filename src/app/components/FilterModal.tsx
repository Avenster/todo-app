'use client';

import React, { useState } from 'react';

export interface FilterCriteria {
  priority: string;
  dueDate: string;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (criteria: FilterCriteria) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply }) => {
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');

  if (!isOpen) return null;

  const handleApply = () => {
    onApply({ priority, dueDate });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black border border-white/10 text-white p-6 rounded-md text-black w-96">
        <h2 className="text-xl text-gray-300 font-bold mb-4">Filter Tasks</h2>
        <div className="mb-4">
          <label className="block mb-1">Priority</label>
          <select 
            className="w-full border border-white/10 bg-gray-700/10 text-white rounded p-2" 
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Due Date</label>
          <input 
            type="date"
            className="w-full border border-white/10 bg-gray-700/10 text-white rounded p-2" 
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-700/10 border border-white/10 text-white rounded" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-green-400 text-white rounded" onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;