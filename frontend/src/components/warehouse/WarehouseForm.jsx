import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Loader from '../shared/Loader';

const WarehouseForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 2)
      newErrors.name = 'Name must be at least 2 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      await onSubmit(formData);
      setLoading(false);
      setFormData({ name: '', address: '' });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Warehouse">
      <form onSubmit={handleSubmit}>
        <Input
          label="Warehouse Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          placeholder="Enter warehouse name"
        />
        <Input
          label="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          placeholder="Enter address (optional)"
        />
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader /> : 'Add Warehouse'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default WarehouseForm;