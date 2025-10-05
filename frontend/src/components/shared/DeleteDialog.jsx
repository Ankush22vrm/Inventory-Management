import React from 'react';
import Button from './Button';
import Loader from './Loader';

const DeleteDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Delete',
  message,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={loading}>
            {loading ? <Loader /> : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;