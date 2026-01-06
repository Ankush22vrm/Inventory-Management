import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import Button from '../shared/Button';
import WarehouseList from './WarehouseList';
import WarehouseForm from './WarehouseForm';
import DeleteDialog from '../shared/DeleteDialog';
import {
  fetchWarehouses,
  createWarehouse,
  deleteWarehouse,
  setSelectedWarehouse,
} from '../../redux/slices/warehouseSlice';

const WarehouseManager = ({ showToast, onWarehouseSelect }) => {
  const dispatch = useDispatch();
  
  const { warehouses, selectedWarehouse, loading } = useSelector(
    (state) => state.warehouse
  );

  const [showWarehouseForm, setShowWarehouseForm] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    id: null,
  });

  // Load warehouses on mount
  useEffect(() => {
    dispatch(fetchWarehouses());
  }, [dispatch]);

  const handleAddWarehouse = async (data) => {
    try {
      await dispatch(createWarehouse(data)).unwrap();
      showToast('Warehouse added successfully!');
      setShowWarehouseForm(false);
    } catch (error) {
      showToast(error.message || 'Failed to add warehouse', 'error');
    }
  };

  const handleDeleteWarehouse = async () => {
    try {
      await dispatch(deleteWarehouse(deleteDialog.id)).unwrap();
      showToast('Warehouse deleted successfully!');
      setDeleteDialog({ isOpen: false, id: null });
    } catch (error) {
      showToast(error.message || 'Failed to delete warehouse', 'error');
    }
  };

  const handleSelectWarehouse = (warehouse) => {
    dispatch(setSelectedWarehouse(warehouse));
    if (onWarehouseSelect) {
      onWarehouseSelect(warehouse);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteDialog({ isOpen: true, id });
  };

  return (
    <>
      <div className="w-64 bg-white shadow-lg p-4 overflow-y-auto">
        <Button onClick={() => setShowWarehouseForm(true)} className="w-full mb-4">
          <Plus size={18} />
          Add Warehouse
        </Button>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">Loading warehouses...</p>
          </div>
        ) : warehouses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No warehouses yet</p>
            <p className="text-gray-400 text-xs mt-1">Create your first warehouse</p>
          </div>
        ) : (
          <WarehouseList
            warehouses={warehouses}
            selectedWarehouse={selectedWarehouse}
            onSelectWarehouse={handleSelectWarehouse}
            onDeleteWarehouse={handleDeleteClick}
          />
        )}
      </div>

      {/* Warehouse Form Modal */}
      <WarehouseForm
        isOpen={showWarehouseForm}
        onClose={() => setShowWarehouseForm(false)}
        onSubmit={handleAddWarehouse}
      />

      {/* Delete Warehouse Confirmation Dialog */}
      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, id: null })}
        onConfirm={handleDeleteWarehouse}
        title="Delete Warehouse"
        message="Are you sure you want to delete this warehouse? This action cannot be undone and will delete all products in this warehouse."
      />
    </>
  );
};

export default WarehouseManager;