// src/components/PelayananModal.js

import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

const PelayananModal = ({ pelayanan, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nomor: '',
  });
  const [modalLoading, setModalLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, setModalLoading);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">{pelayanan ? 'Process Pelayanan' : 'Add Pelayanan'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nomor</label>
          <input
            type="text"
            name="nomor"
            value={formData.nomor}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="text-right">
          <button type="button" onClick={onClose} className="mr-4 bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={modalLoading}>
            {modalLoading ? <ClipLoader color="#fff" size={20} /> : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PelayananModal;
