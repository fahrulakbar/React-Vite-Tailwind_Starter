import React, { useState, useEffect } from 'react';
import EditModal from './EditModal';
import useAppContext from '../../context/useAppContext';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import axios from 'axios'; // Add axios import

const LembagaCrud = () => {
  const [lembagaData, setLembagaData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentLembaga, setCurrentLembaga] = useState(null);
  const { axiosInstance } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/lembaga');
      setLembagaData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (lembaga) => {
    setCurrentLembaga(lembaga);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/lembaga/${id}`);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedLembaga, setModalLoading) => {
    setModalLoading(true);
    try {
      if (updatedLembaga.id) {
        // Update existing lembaga
        await axiosInstance.put(`/lembaga/${updatedLembaga.id}`, updatedLembaga);
      } else {
        // Create new lembaga
        await axiosInstance.post('/lembaga', updatedLembaga);
      }
      setIsOpen(false);
      fetchData(); // Refresh data after saving
    } catch (error) {
      console.error('Error saving lembaga:', error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentLembaga(null); // Clear currentLembaga to reset form
    setIsOpen(true);
  };

  const filteredData = lembagaData.filter(lembaga => lembaga.nama.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">Daftar Lembaga</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari Lembaga"
          className="border px-4 py-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          onClick={handleAddNew}
        >
          <FaPlus className="mr-2" /> Tambahkan Lembaga
        </button>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#3b82f6" loading={loading} size={50} />
          </div>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Nama</th>
                <th className="border px-4 py-2">Singkatan</th>
                <th className="border px-4 py-2">Deskripsi</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(lembaga => (
                <tr key={lembaga.id}>
                  <td className="border px-4 py-2">{lembaga.uuid}</td>
                  <td className="border px-4 py-2">{lembaga.nama}</td>
                  <td className="border px-4 py-2">{lembaga.singkatan}</td>
                  <td className="border px-4 py-2">{lembaga.logo}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2 flex items-center"
                      onClick={() => handleEdit(lembaga)}
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                      onClick={() => handleDelete(lembaga.id)}
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {isOpen && (
        <EditModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          lembaga={currentLembaga}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default LembagaCrud;
