import React from 'react';
import { useSelector } from 'react-redux';
import { Warehouse as WarehouseIcon } from 'lucide-react';
import WarehouseManager from '../components/warehouse/WarehouseManager';
import ProductManager from '../components/product/ProductManager';

const Dashboard = ({ showToast }) => {
  const { selectedWarehouse } = useSelector((state) => state.warehouse);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Warehouse Sidebar */}
      <WarehouseManager showToast={showToast} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6">
          {selectedWarehouse ? (
            <ProductManager 
              selectedWarehouse={selectedWarehouse} 
              showToast={showToast} 
            />
          ) : (
            <div className="text-center py-16">
              <WarehouseIcon size={64} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-600">
                No warehouse selected
              </h2>
              <p className="text-gray-500 mt-2">
                Please select or create a warehouse to manage products
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;