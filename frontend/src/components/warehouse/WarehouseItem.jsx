import React from 'react';
import { Trash2 } from 'lucide-react';

const WarehouseItem = ({ warehouse, isSelected, onSelect, onDelete }) => {
  return (
    <div
      className={`p-3 rounded-lg cursor-pointer transition-colors flex justify-between items-center ${
        isSelected
          ? 'bg-purple-100 border-2 border-purple-600'
          : 'hover:bg-gray-100'
      }`}
      onClick={onSelect}
    >
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800 truncate">{warehouse.name}</p>
        <p className="text-xs text-gray-500 truncate">{warehouse.address}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default WarehouseItem;