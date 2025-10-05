import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Warehouse as WarehouseIcon } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/shared/Button';
import ProductFilters from '../components/product/ProductFilters';
import ProductList from '../components/product/ProductList';
import WarehouseForm from '../components/warehouse/WarehouseForm';
import ProductForm from '../components/product/ProductForm';
import DeleteDialog from '../components/shared/DeleteDialog';
import { ITEMS_PER_PAGE } from '../utils/constants';
import {
  fetchWarehouses,
  createWarehouse,
  deleteWarehouse,
  setSelectedWarehouse,
} from '../redux/slices/warehouseSlice';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../redux/slices/productSlice';

const Dashboard = ({ showToast }) => {
  const dispatch = useDispatch();
  
 const { warehouses, selectedWarehouse, loading: warehouseLoading } = useSelector(
  (state) => state.warehouse
);

  const { products, loading: productLoading } = useSelector((state) => state.product);


  const [showWarehouseForm, setShowWarehouseForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    type: null,
    id: null,
  });
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  // Load warehouses on mount
  useEffect(() => {
    dispatch(fetchWarehouses());
  }, [dispatch]);

  // Load products when warehouse is selected
  useEffect(() => {
    if (selectedWarehouse) {
      dispatch(fetchProducts(selectedWarehouse._id));
    }
  }, [dispatch, selectedWarehouse]);

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
      setDeleteDialog({ isOpen: false, type: null, id: null });
    } catch (error) {
      showToast(error.message || 'Failed to delete warehouse', 'error');
    }
  };

  const handleSelectWarehouse = (warehouse) => {
    dispatch(setSelectedWarehouse(warehouse));
  };

  const handleAddProduct = async (data) => {
    try {
      if (editingProduct) {
        await dispatch(updateProduct({ id: editingProduct._id, productData: data })).unwrap();
        showToast('Product updated successfully!');
      } else {
        await dispatch(createProduct(data)).unwrap();
        showToast('Product added successfully!');
      }
      setShowProductForm(false);
      setEditingProduct(null);
    } catch (error) {
      showToast(error.message || 'Failed to save product', 'error');
    }
  };
  
  const handleDeleteProduct = async () => {
    try {
      await dispatch(deleteProduct(deleteDialog.id)).unwrap();
      showToast('Product deleted successfully!');
      setDeleteDialog({ isOpen: false, type: null, id: null });
    } catch (error) {
      showToast(error.message || 'Failed to delete product', 'error');
    }
  };

  const filteredProducts = products
    .filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || p.category === filters.category;
      const matchesStatus =
        !filters.status ||
        (filters.status === 'inStock' ? p.inStock : !p.inStock);
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aValue =
        sortConfig.key === 'name'
          ? a.name
          : sortConfig.key === 'quantity'
          ? a.quantity
          : a.pricePerUnit;
      const bValue =
        sortConfig.key === 'name'
          ? b.name
          : sortConfig.key === 'quantity'
          ? b.quantity
          : b.pricePerUnit;

      if (sortConfig.key === 'name') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const resetFilters = () => {
    setFilters({ search: '', category: '', status: '' });
    setSortConfig({ key: null, direction: 'asc' });
    setCurrentPage(1);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        warehouses={warehouses}
        selectedWarehouse={selectedWarehouse}
        onSelectWarehouse={handleSelectWarehouse}
        onAddWarehouse={() => setShowWarehouseForm(true)}
        onDeleteWarehouse={(id) =>
          setDeleteDialog({ isOpen: true, type: 'warehouse', id })
        }
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6">
          {selectedWarehouse ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {selectedWarehouse.name}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {selectedWarehouse.address}
                  </p>
                </div>
                <Button onClick={() => setShowProductForm(true)}>
                  <Plus size={18} />
                  Add Product
                </Button>
              </div>

              {/* Filters */}
              <ProductFilters
                filters={filters}
                onFilterChange={setFilters}
                onReset={resetFilters}
              />

              {/* Products List */}
              {productLoading ? (
                <div className="bg-white rounded-lg shadow-md p-16 text-center">
                  <p className="text-gray-500">Loading products...</p>
                </div>
              ) : paginatedProducts.length > 0 ? (
                <ProductList
                  products={paginatedProducts}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  onEdit={(product) => {
                    setEditingProduct(product);
                    setShowProductForm(true);
                  }}
                  onDelete={(id) =>
                    setDeleteDialog({ isOpen: true, type: 'product', id })
                  }
                  onSort={handleSort}
                  sortConfig={sortConfig}
                />
              ) : (
                <div className="bg-white rounded-lg shadow-md p-16 text-center">
                  <p className="text-gray-500">
                    No products found. Add your first product to get started!
                  </p>
                </div>
              )}
            </>
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

      {/* Modals */}
      <WarehouseForm
        isOpen={showWarehouseForm}
        onClose={() => setShowWarehouseForm(false)}
        onSubmit={handleAddWarehouse}
      />

      <ProductForm
        isOpen={showProductForm}
        onClose={() => {
          setShowProductForm(false);
          setEditingProduct(null);
        }}
        onSubmit={handleAddProduct}
        warehouseId={selectedWarehouse?._id}
        product={editingProduct}
      />

      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, type: null, id: null })}
        onConfirm={
          deleteDialog.type === 'warehouse'
            ? handleDeleteWarehouse
            : handleDeleteProduct
        }
        title={`Delete ${
          deleteDialog.type === 'warehouse' ? 'Warehouse' : 'Product'
        }`}
        message={`Are you sure you want to delete this ${deleteDialog.type}? This action cannot be undone.`}
      />
    </div>
  );
};

export default Dashboard;