import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Button from '../shared/Button';

const Sidebar = ({
  warehouses,
  selectedWarehouse,
  onSelectWarehouse,
  onAddWarehouse,
  onDeleteWarehouse,
}) => {
  return (
    <div className="w-64 bg-white shadow-lg p-4 overflow-y-auto">
      <Button onClick={onAddWarehouse} className="w-full mb-4">
        <Plus size={18} />
        Add Warehouse
      </Button>
      <div className="space-y-2">
        {warehouses.map((wh) => (
          <div
            key={wh._id}
            className={`p-3 rounded-lg cursor-pointer transition-colors flex justify-between items-center ${
              selectedWarehouse?._id === wh._id
                ? 'bg-purple-100 border-2 border-purple-600'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => onSelectWarehouse(wh)}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{wh.name}</p>
              <p className="text-xs text-gray-500 truncate">{wh.address}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteWarehouse(wh._id);
              }}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;