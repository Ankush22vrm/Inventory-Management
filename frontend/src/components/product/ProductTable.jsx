
import React from 'react';
import { Edit2, Trash2, ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';
import { getImageURL } from '../../utils/api';

const ProductTable = ({ products, onEdit, onDelete, onSort, sortConfig }) => {
  const SortButton = ({ sortKey, label }) => (
    <button
      onClick={() => onSort(sortKey)}
      className="flex items-center gap-1 hover:text-purple-600"
    >
      {label}{' '}
      {sortConfig.key === sortKey ? (
        sortConfig.direction === 'asc' ? (
          <ChevronUp size={16} />
        ) : (
          <ChevronDown size={16} />
        )
      ) : (
        <ArrowUpDown size={16} className="opacity-30" />
      )}
    </button>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-purple-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Image
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              <SortButton sortKey="name" label="Name" />
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Category
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              <SortButton sortKey="pricePerUnit" label="Price" />
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              <SortButton sortKey="quantity" label="Quantity" />
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Total Value
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <img
                  src={getImageURL(product.imageUrl)}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </td>
              <td className="px-4 py-3 font-medium text-gray-800">
                {product.name}
              </td>
              <td className="px-4 py-3 text-gray-600 capitalize">
                {product.category}
              </td>
              <td className="px-4 py-3 text-gray-600">
                ${product.pricePerUnit}
              </td>
              <td className="px-4 py-3 text-gray-600">{product.quantity}</td>
              <td className="px-4 py-3 text-gray-600">${product.totalValue}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.inStock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;