import api from '../../utils/api';

export const getWarehousesAPI = () => api.get('/warehouses');

export const createWarehouseAPI = (formData) => api.post('/warehouses', formData);

export const deleteWarehouseAPI = (warehouseId) => api.delete(`/warehouses/${warehouseId}`);

// ✅ Update warehouse details
export const updateWarehouseDetailsAPI = (warehouseId, updateData) =>
  api.put(`/warehouses/${warehouseId}`, updateData);

// ✅ Get warehouse statistics
export const getWarehouseStatsAPI = (warehouseId) => api.get(`/warehouses/${warehouseId}/stats`);
