// src/components/EditModal.js

import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

const EditModal = ({ data, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    slug: data?.slug || '',
    judul: data?.judul || '',
    isi: data?.isi || '',
    thumbnail: data?.thumbnail || '',
  });
  const [modalLoading, setModalLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, thumbnail: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, setModalLoading);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">{data ? 'Edit Data' : 'Tambah Data'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Judul</label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Isi</label>
          <textarea
            name="isi"
            value={formData.isi}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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

export default EditModal;
