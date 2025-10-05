import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getWarehousesAPI,
  createWarehouseAPI,
  deleteWarehouseAPI,
} from '../api/warehouseApi';

export const fetchWarehouses = createAsyncThunk(
  'warehouses/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getWarehousesAPI();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createWarehouse = createAsyncThunk(
  'warehouses/create',
  async (warehouseData, { rejectWithValue }) => {
    try {
      const data = await createWarehouseAPI(warehouseData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWarehouse = createAsyncThunk(
  'warehouses/delete',
  async (warehouseId, { rejectWithValue }) => {
    try {
      await deleteWarehouseAPI(warehouseId);
      return warehouseId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const warehouseSlice = createSlice({
  name: 'warehouses',
  initialState: {
    warehouses: [],
    selectedWarehouse: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedWarehouse: (state, action) => {
      state.selectedWarehouse = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWarehouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWarehouses.fulfilled, (state, action) => {
        state.loading = false;
        state.warehouses = action.payload;
      })
      .addCase(fetchWarehouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createWarehouse.fulfilled, (state, action) => {
        state.warehouses.push(action.payload);
      })
      .addCase(deleteWarehouse.fulfilled, (state, action) => {
        state.warehouses = state.warehouses.filter(
          (w) => w._id !== action.payload
        );
      });
  },
});

export const { setSelectedWarehouse, clearError } = warehouseSlice.actions;
export default warehouseSlice.reducer;
