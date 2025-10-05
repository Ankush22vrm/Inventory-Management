
import api from '../../utils/api';


export const getProductsByCategory = async (warehouseId, category) => {
  try {
    const data = await api.get(`/products?warehouseId=${warehouseId}&category=${category}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const exportProducts = async (warehouseId) => {
  try {
    const data = await api.get(`/products/export?warehouseId=${warehouseId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

