'use client';

import React, { useState } from 'react';

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (sortBy: string) => void;
}

const SortModal: React.FC<SortModalProps> = ({ isOpen, onClose, onApply }) => {
  const [sortBy, setSortBy] = useState('');

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(sortBy);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black border border-white/10  p-6 rounded-md text-black w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-200">Sort Tasks</h2>
        <div className="mb-4">
          <label className="block mb-1">Sort By</label>
          <select 
            className="w-full  border border-white/10 bg-gray-700/10 text-white rounded p-2" 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">None</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-700/10 text-white border border-white/10 rounded" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-green-400 text-white rounded" onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default SortModal;