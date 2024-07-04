import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

const EditModal = ({ isOpen, setIsOpen, lembaga, onSave }) => {
  const [formData, setFormData] = useState(lembaga || {});
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    setFormData(lembaga || {});
  }, [lembaga]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData, setModalLoading);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">{lembaga ? 'Edit Lembaga' : 'Add Lembaga'}</h2>
        {modalLoading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#3b82f6" loading={modalLoading} size={50} />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              Nama:
              <input type="text" name="nama" value={formData.nama || ''} onChange={handleChange} className="block w-full mt-1 border rounded px-2 py-1" />
            </label>
            <label className="block mb-2">
              Singkatan:
              <input type="text" name="singkatan" value={formData.singkatan || ''} onChange={handleChange} className="block w-full mt-1 border rounded px-2 py-1" />
            </label>
            <label className="block mb-2">
              Deskripsi:
              <textarea name="deskripsi" value={formData.deskripsi || ''} onChange={handleChange} className="block w-full mt-1 border rounded px-2 py-1" />
            </label>
            {/* Add more fields as needed */}
            <div className="mt-4">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditModal;
