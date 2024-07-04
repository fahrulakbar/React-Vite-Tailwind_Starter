// src/App.js
import React, { useEffect, useState } from 'react';
import ProgressBar from './progressBar';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAppContext from '../../context/useAppContext';

Modal.setAppElement('#root'); // Ensure Modal sets the app element correctly

function PengembanganComponent() {
  const { axiosInstance } = useAppContext();

  const getPembangunanList = async () => {
    const response = await axiosInstance.get('/pembangunan');
    return response.data.data;
  };

  const getPembangunanDetail = async (id) => {
    const response = await axiosInstance.get(`/pembangunan/${id}`);
    return response.data;
  };

  const createPembangunan = async (data) => {
    const response = await axiosInstance.post('/pembangunan', data);
    return response.data;
  };

  const updatePembangunan = async (id, data) => {
    const response = await axiosInstance.put(`/pembangunan/${id}`, data);
    return response.data;
  };

  const [pembangunanList, setPembangunanList] = useState([]);
  const [selectedPembangunan, setSelectedPembangunan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    thumbnail: null,
    foto: null,
    progress: [{ text: '', status: '', tanggal: '' }],
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPembangunanList();
      setPembangunanList(result);
    };
    fetchData();
  }, []);

  const handleSelect = async (id) => {
    const result = await getPembangunanDetail(id);
    setSelectedPembangunan(result);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddProgress = () => {
    setFormData({
      ...formData,
      progress: [...formData.progress, { text: '', status: '', tanggal: '' }],
    });
  };

  const handleProgressChange = (index, e) => {
    const newProgress = formData.progress.map((milestone, idx) => {
      if (idx === index) {
        return { ...milestone, [e.target.name]: e.target.value };
      }
      return milestone;
    });
    setFormData({ ...formData, progress: newProgress });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('judul', formData.judul);
    data.append('deskripsi', formData.deskripsi);
    data.append('thumbnail', formData.thumbnail);
    data.append('foto', formData.foto);
    formData.progress.forEach((milestone, index) => {
      data.append(`progress[${index}][text]`, milestone.text);
      data.append(`progress[${index}][status]`, milestone.status);
      data.append(`progress[${index}][tanggal]`, milestone.tanggal);
    });

    try {
      if (isCreateMode) {
        await createPembangunan(data);
        toast.success('Pembangunan created successfully!');
      } else {
        await updatePembangunan(selectedPembangunan.id, data);
        toast.success('Pembangunan updated successfully!');
      }
      setIsModalOpen(false);
      setFormData({
        judul: '',
        deskripsi: '',
        thumbnail: null,
        foto: null,
        progress: [{ text: '', status: '', tanggal: '' }],
      });
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Pembangunan</h1>
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        onClick={() => {
          setIsCreateMode(true);
          setIsModalOpen(true);
        }}
      >
        Create New Pembangunan
      </button>
      <ul className="space-y-2">
        {pembangunanList.map((pembangunan) => (
          <li
            key={pembangunan.id}
            className="p-4 bg-white shadow rounded cursor-pointer"
            onClick={() => handleSelect(pembangunan.id)}
          >
            <h2 className="text-xl font-semibold">{pembangunan.judul}</h2>
            {pembangunan.thumbnail && (
              <img src={pembangunan.thumbnail} alt={pembangunan.judul} className="w-full h-48 object-cover mt-2 rounded" />
            )}
            <p className="text-gray-600">{pembangunan.deskripsi}</p>
          </li>
        ))}
      </ul>

      {selectedPembangunan && (
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-4">{selectedPembangunan.judul}</h1>
          <img src={selectedPembangunan.thumbnail} alt={selectedPembangunan.judul} className="w-full h-48 object-cover rounded" />
          <p className="mt-4">{selectedPembangunan.deskripsi}</p>
          <h2 className="text-xl font-semibold mt-6">Progress</h2>
          {selectedPembangunan.progress.map((milestone, index) => (
            <ProgressBar key={index} milestone={milestone} />
          ))}
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            onClick={() => {
              setIsCreateMode(false);
              setIsModalOpen(true);
              setFormData({
                ...selectedPembangunan,
                thumbnail: null,
                foto: null,
              });
            }}
          >
            Edit Pembangunan
          </button>
        </div>
      )}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Edit Pembangunan"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
          shouldCloseOnOverlayClick={true}
        >
          <div className="bg-white p-8 rounded-lg max-w-lg w-full overflow-y-auto max-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
              {isCreateMode ? 'Create Pembangunan' : 'Edit Pembangunan'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Judul</label>
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Thumbnail</label>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Foto</label>
                <input
                  type="file"
                  name="foto"
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Progress</h3>
                {formData.progress.map((milestone, index) => (
                  <div key={index} className="mb-2">
                    <label className="block text-gray-700 font-semibold">Text</label>
                    <input
                      type="text"
                      name="text"
                      value={milestone.text}
                      onChange={(e) => handleProgressChange(index, e)}
                      className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <label className="block text-gray-700 font-semibold mt-2">Status</label>
                    <input
                      type="text"
                      name="status"
                      value={milestone.status}
                      onChange={(e) => handleProgressChange(index, e)}
                      className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <label className="block text-gray-700 font-semibold mt-2">Tanggal</label>
                    <input
                      type="date"
                      name="tanggal"
                      value={milestone.tanggal}
                      onChange={(e) => handleProgressChange(index, e)}
                      className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 mt-4"
                  onClick={handleAddProgress}
                >
                  Add Progress
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isCreateMode ? 'Create' : 'Update'}
              </button>
            </form>
          </div>
        </Modal>
    </div>
  );
}

export default PengembanganComponent;
