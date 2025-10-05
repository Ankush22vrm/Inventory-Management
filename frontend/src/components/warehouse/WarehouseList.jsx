import React from 'react';
import WarehouseItem from './WarehouseItem';

const WarehouseList = ({
  warehouses,
  selectedWarehouse,
  onSelectWarehouse,
  onDeleteWarehouse,
}) => {
  return (
    <div className="space-y-2">
      {warehouses.map((wh) => (
        <WarehouseItem
          key={wh._id}
          warehouse={wh}
          isSelected={selectedWarehouse?._id === wh._id}
          onSelect={() => onSelectWarehouse(wh)}
          onDelete={() => onDeleteWarehouse(wh._id)}
        />
      ))}
    </div>
  );
};

export default WarehouseList;