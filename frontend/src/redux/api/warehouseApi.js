import api from '../../utils/api';

// ✅ Get all warehouses
export const getWarehousesAPI = () => api.get('/warehouses');

// ✅ Create a new warehouse
export const createWarehouseAPI = (formData) => api.post('/warehouses', formData);

// ✅ Delete a warehouse
export const deleteWarehouseAPI = (warehouseId) => api.delete(`/warehouses/${warehouseId}`);

// ✅ Update warehouse details
export const updateWarehouseDetailsAPI = (warehouseId, updateData) =>
  api.put(`/warehouses/${warehouseId}`, updateData);

// ✅ Get warehouse statistics
export const getWarehouseStatsAPI = (warehouseId) => api.get(`/warehouses/${warehouseId}/stats`);
