import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import Button from '../shared/Button';
import ProductFilters from './ProductFilters';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import DeleteDialog from '../shared/DeleteDialog';
import { ITEMS_PER_PAGE } from '../../utils/constants';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../redux/slices/productSlice';

const ProductManager = ({ selectedWarehouse, showToast }) => {
  const dispatch = useDispatch();
  const { products, loading: productLoading } = useSelector((state) => state.product);

  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    id: null,
  });
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  // Load products when warehouse changes
  useEffect(() => {
    if (selectedWarehouse) {
      dispatch(fetchProducts(selectedWarehouse._id));
      // Reset filters and pagination when warehouse changes
      setFilters({ search: '', category: '', status: '' });
      setSortConfig({ key: null, direction: 'asc' });
      setCurrentPage(1);
    }
  }, [dispatch, selectedWarehouse]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortConfig]);

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
      setDeleteDialog({ isOpen: false, id: null });
    } catch (error) {
      showToast(error.message || 'Failed to delete product', 'error');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

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

  // Filter and sort products
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

  if (!selectedWarehouse) return null;

  return (
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
          onEdit={handleEditProduct}
          onDelete={(id) =>
            setDeleteDialog({ isOpen: true, id })
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

      {/* Product Form Modal */}
      <ProductForm
        isOpen={showProductForm}
        onClose={() => {
          setShowProductForm(false);
          setEditingProduct(null);
        }}
        onSubmit={handleAddProduct}
        warehouseId={selectedWarehouse._id}
        product={editingProduct}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, id: null })}
        onConfirm={handleDeleteProduct}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </>
  );
};

export default ProductManager;