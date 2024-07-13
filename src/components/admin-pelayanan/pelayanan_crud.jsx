// src/components/PelayananCrud.js

import React, { useState, useEffect } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import Modal from 'react-modal';
import useAppContext from '../../context/useAppContext';
import { toast } from 'react-toastify';
import PelayananModal from './pelayanan_modal';
import CreatePelayananForm from './pelayanan_form';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    width: '90%',
    padding: '20px',
  },
};

Modal.setAppElement('#root');

const PelayananCrud = () => {
  const [pelayananData, setPelayananData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPelayanan, setCurrentPelayanan] = useState(null);
  const { axiosInstance } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('pelayanan');
      setPelayananData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = (pelayanan) => {
    setCurrentPelayanan(pelayanan);
    setIsOpen(true);
  };

  const handleAddNew = () => {
    setCurrentPelayanan(null);
    setIsOpen(true);
  };

  const handleSave = async (updatedPelayanan, setModalLoading) => {
    setModalLoading(true);
    try {
      if (currentPelayanan) {
        // Process existing pelayanan
        const response = await axiosInstance.put(
          `pelayanan/${currentPelayanan.kode_pelayanan}/proses`,
          {
            nomor: updatedPelayanan.nomor,
          },
          { responseType: 'blob' } // Important for downloading files
        );
        
        // Create a link to download the file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf'); // Customize the file name
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        // Create new pelayanan
        await axiosInstance.post('pelayanan', updatedPelayanan);
      }
      setIsOpen(false);
      fetchData(); // Refresh data after saving
      toast.success('Pelayanan processed successfully');
    } catch (error) {
      console.error('Error processing pelayanan:', error);
      toast.error('Error processing pelayanan');
    } finally {
      setModalLoading(false);
    }
  };

  const filteredData = pelayananData.filter(item => item.nama_pelayanan.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">Daftar Pelayanan</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari Pelayanan"
          className="border px-4 py-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          onClick={handleAddNew}
        >
          <FaPlus className="mr-2" /> Tambahkan Pelayanan
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
                <th className="border px-4 py-2">Kode Pelayanan</th>
                <th className="border px-4 py-2">Jenis Pelayanan</th>
                <th className="border px-4 py-2">Nama Pelayanan</th>
                <th className="border px-4 py-2">Nama Pengaju</th>
                <th className="border px-4 py-2">No WA</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.kode_pelayanan}>
                  <td className="border px-4 py-2">{item.kode_pelayanan}</td>
                  <td className="border px-4 py-2">{item.jenis_pelayanan}</td>
                  <td className="border px-4 py-2">{item.nama_pelayanan}</td>
                  <td className="border px-4 py-2">{item.nama_pengaju}</td>
                  <td className="border px-4 py-2">{item.no_wa}</td>
                  <td className="border px-4 py-2">{item.status}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2 flex items-center"
                      onClick={() => handleProcess(item)}
                    >
                      <FaEdit className="mr-1" /> Process
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles} contentLabel="Pelayanan Modal">
          <PelayananModal
            pelayanan={currentPelayanan}
            onClose={() => setIsOpen(false)}
            onSave={handleSave}
          />
        </Modal>
      )}
    </div>
  );
};

export default PelayananCrud;
