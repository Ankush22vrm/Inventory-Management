
import React, { useState, useEffect } from 'react';
import Modal from '../shared/Modal';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Loader from '../shared/Loader';
import { CATEGORIES } from '../../utils/constants';

const ProductForm = ({ isOpen, onClose, onSubmit, warehouseId, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'electronics',
    quantity: '',
    pricePerUnit: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      // EDIT MODE - Pre-fill with existing data
      setFormData({
        name: product.name,
        category: product.category,
        quantity: String(product.quantity),
        pricePerUnit: String(product.pricePerUnit),
        image: null,
      });
    } else {
      // ADD MODE - Empty form
      setFormData({
        name: '',
        category: 'electronics',
        quantity: '',
        pricePerUnit: '',
        image: null,
      });
    }
    setErrors({});
  }, [product, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 2)
      newErrors.name = 'Name must be at least 2 characters';
    if (formData.quantity === '' || Number(formData.quantity) < 0)
      newErrors.quantity = 'Quantity must be zero or positive';
    if (formData.pricePerUnit === '' || Number(formData.pricePerUnit) < 0)
      newErrors.pricePerUnit = 'Price must be zero or positive';
    if (!product && !formData.image)
      newErrors.image = 'Product image is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const data = new FormData();
        
        data.append('name', formData.name);
        data.append('category', formData.category);
        data.append('quantity', formData.quantity);
        data.append('pricePerUnit', formData.pricePerUnit);
        
        // Automatically set inStock based on quantity
        const inStock = Number(formData.quantity) > 0;
        data.append('inStock', inStock ? 'true' : 'false');
        
        data.append('warehouseId', warehouseId);
        
        if (formData.image) {
          data.append('image', formData.image);
        }

        // Log FormData contents
        console.log('FormData contents:');
        for (let [key, value] of data.entries()) {
          console.log(`${key}:`, value);
        }
        
        console.log('Product ID for update:', product?._id);
        console.log('Is editing:', !!product);

        await onSubmit(data);
        
        setFormData({
          name: '',
          category: 'electronics',
          quantity: '',
          pricePerUnit: '',
          image: null,
        });
        setErrors({});
      } catch (error) {
        console.error('Form submission error:', error);
        setErrors({ submit: error.message || 'Failed to submit form' });
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Validation errors:', newErrors);
      setErrors(newErrors);
    }
  };

  // Calculate stock status for display
  const stockStatus = Number(formData.quantity) > 0 ? 'In Stock' : 'Out of Stock';
  const stockStatusColor = Number(formData.quantity) > 0 ? 'text-green-600' : 'text-red-600';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Edit Product' : 'Add Product'}
    >
      <form onSubmit={handleSubmit}>
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.submit}
          </div>
        )}
        
        <Input
          label="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          placeholder="Enter product name"
        />
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        
        <Input
          label="Quantity"
          type="number"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
          error={errors.quantity}
          placeholder="Enter quantity"
          min="0"
        />
        
        {/* Stock Status Display */}
        {formData.quantity !== '' && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              Stock Status: <span className={`font-semibold ${stockStatusColor}`}>{stockStatus}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {Number(formData.quantity) > 0 
                ? 'Product will be marked as in stock' 
                : 'Product will be marked as out of stock'}
            </p>
          </div>
        )}
        
        <Input
          label="Price Per Unit"
          type="number"
          step="0.01"
          value={formData.pricePerUnit}
          onChange={(e) =>
            setFormData({ ...formData, pricePerUnit: e.target.value })
          }
          error={errors.pricePerUnit}
          placeholder="Enter price"
          min="0"
        />
        
        <Input
          label={product ? 'Product Image (Optional)' : 'Product Image'}
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
          error={errors.image}
        />
        
        {product && !formData.image && (
          <p className="text-sm text-gray-500 mb-4">
            Current image will be kept if no new image is uploaded
          </p>
        )}
        
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader /> : product ? 'Update Product' : 'Add Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductForm;