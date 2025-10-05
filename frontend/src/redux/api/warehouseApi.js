import api from '../../utils/api';

export const getWarehousesAPI = () => api.get('/warehouses');

export const createWarehouseAPI = (formData) => api.post('/warehouses', formData);

export const deleteWarehouseAPI = (warehouseId) => api.delete(`/warehouses/${warehouseId}`);
