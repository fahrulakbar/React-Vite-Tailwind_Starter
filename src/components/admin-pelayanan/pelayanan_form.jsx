// src/components/CreatePelayananForm.js

import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

const CreatePelayananForm = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    jenis_pelayanan: '',
    nama_pelayanan: '',
    nama_pengaju: '',
    no_wa: '',
    status: '0',
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
      <h1 className="text-2xl font-bold mb-5">Add New Pelayanan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Jenis Pelayanan</label>
          <input
            type="text"
            name="jenis_pelayanan"
            value={formData.jenis_pelayanan}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Pelayanan</label>
          <input
            type="text"
            name="nama_pelayanan"
            value={formData.nama_pelayanan}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Pengaju</label>
          <input
            type="text"
            name="nama_pengaju"
            value={formData.nama_pengaju}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">No WA</label>
          <input
            type="text"
            name="no_wa"
            value={formData.no_wa}
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

export default CreatePelayananForm;
