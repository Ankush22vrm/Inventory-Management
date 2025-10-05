import React from 'react';
import ProductTable from './ProductTable';
import Pagination from './Pagination';

const ProductList = ({
  products,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  onSort,
  sortConfig,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ProductTable
        products={products}
        onEdit={onEdit}
        onDelete={onDelete}
        onSort={onSort}
        sortConfig={sortConfig}
      />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default ProductList;