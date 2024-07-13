// src/components/DataPenduduk.js

import React, { useEffect, useState, useRef } from 'react';
import { FaFileExport, FaFileImport, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import useAppContext from '../../context/useAppContext';

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

const DataPenduduk = () => {
  const { axiosInstance } = useAppContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [importUrl, setImportUrl] = useState('');
  const [confirmImportVisible, setConfirmImportVisible] = useState(false);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [importDropdownOpen, setImportDropdownOpen] = useState(false);

  const exportDropdownRef = useRef(null);
  const importDropdownRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target)) {
        setExportDropdownOpen(false);
      }
      if (importDropdownRef.current && !importDropdownRef.current.contains(event.target)) {
        setImportDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/data-penduduk');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const exportData = async (url) => {
    try {
      const response = await axiosInstance.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const fileName = url.split('/').pop() + '.xlsx';
      saveAs(blob, fileName);
      toast.success('Data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Error exporting data');
    }
  };

  const importData = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axiosInstance.post(importUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setModalIsOpen(false);
      toast.success('Data imported successfully');
      fetchData(); // Refresh data after import
    } catch (error) {
      console.error('Error importing data:', error);
      toast.error('Error importing data');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const openModal = (url) => {
    setImportUrl(url);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFile(null);
    setConfirmImportVisible(false);
  };

  const toggleExportDropdown = () => {
    setExportDropdownOpen(!exportDropdownOpen);
    setImportDropdownOpen(false);
  };

  const toggleImportDropdown = () => {
    setImportDropdownOpen(!importDropdownOpen);
    setExportDropdownOpen(false);
  };

  const handleConfirmImport = () => {
    setConfirmImportVisible(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Penduduk</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#3b82f6" loading={loading} size={50} />
        </div>
      ) : (
        <div>
          <div className="flex justify-end mb-4">
            <div ref={exportDropdownRef} className="relative inline-block text-left mr-4">
              <button onClick={toggleExportDropdown} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
                <FaFileExport className="mr-2" /> Export Data {exportDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {exportDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button
                      onClick={() => exportData('/data-penduduk/export-umur')}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      role="menuitem"
                    >
                      Export Umur
                    </button>
                    <button
                      onClick={() => exportData('/data-penduduk/export-hubungan-keluarga')}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      role="menuitem"
                    >
                      Export Hubungan Keluarga
                    </button>
                    <button
                      onClick={() => exportData('/data-penduduk/export-status-perkawinan')}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      role="menuitem"
                    >
                      Export Status Perkawinan
                    </button>
                    <button
                      onClick={() => exportData('/data-penduduk/export-pekerjaan')}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      role="menuitem"
                    >
                      Export Pekerjaan
                    </button>
                    <button
                      onClick={() => exportData('/data-penduduk/export-tingkat-pendidikan')}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      role="menuitem"
                    >
                      Export Tingkat Pendidikan
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div ref={importDropdownRef} className="relative inline-block text-left">
              <button onClick={toggleImportDropdown} className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
                <FaFileImport className="mr-2" /> Import Data {importDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {importDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button
                      onClick={() => openModal('/data-penduduk/import-umur')}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      role="menuitem"
                    >
                      Import Umur
                    </button>
                    <button
                      onClick={() => openModal('/data-penduduk/import-hubungan-keluarga')}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      role="menuitem"
                    >
                      Import Hubungan Keluarga
                    </button>
                    <button
                      onClick={() => openModal('/data-penduduk/import-status-perkawinan')}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      role="menuitem"
                    >
                      Import Status Perkawinan
                    </button>
                    <button
                      onClick={() => openModal('/data-penduduk/import-pekerjaan')}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      role="menuitem"
                    >
                      Import Pekerjaan
                    </button>
                    <button
                      onClick={() => openModal('/data-penduduk/import-tingkat-pendidikan')}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      role="menuitem"
                    >
                      Import Tingkat Pendidikan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Agama</h2>
            <table className="min-w-full bg-white border mb-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Agama</th>
                  <th className="border px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {data.agama && Object.entries(data.agama).map(([key, value]) => (
                  <tr key={key}>
                    <td className="border px-4 py-2">{key}</td>
                    <td className="border px-4 py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-4">Jenis Kelamin</h2>
            <table className="min-w-full bg-white border mb-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Jenis Kelamin</th>
                  <th className="border px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {data.jenis_kelamin && Object.entries(data.jenis_kelamin).map(([key, value]) => (
                  <tr key={key}>
                    <td className="border px-4 py-2">{key}</td>
                    <td className="border px-4 py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-4">Umur</h2>
            <table className="min-w-full bg-white border mb-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Kelompok Umur</th>
                  <th className="border px-4 py-2">Laki-Laki</th>
                  <th className="border px-4 py-2">Perempuan</th>
                  <th className="border px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {data.umur && data.umur.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item['Kelompok Umur']}</td>
                    <td className="border px-4 py-2">{item['Laki-laki']}</td>
                    <td className="border px-4 py-2">{item['Perempuan']}</td>
                    <td className="border px-4 py-2">{item['Jumlah']}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-4">Status Perkawinan</h2>
            <table className="min-w-full bg-white border mb-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Status Perkawinan</th>
                  <th className="border px-4 py-2">Kelompok Umur</th>
                  <th className="border px-4 py-2">Laki-Laki</th>
                  <th className="border px-4 py-2">Perempuan</th>
                  <th className="border px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {data.status_perkawinan && data.status_perkawinan.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item['Status Perkawinan']}</td>
                    <td className="border px-4 py-2">{item['Kelompok Umur']}</td>
                    <td className="border px-4 py-2">{item['Laki-Laki']}</td>
                    <td className="border px-4 py-2">{item['Perempuan']}</td>
                    <td className="border px-4 py-2">{item['Jumlah']}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-4">Pekerjaan</h2>
            <table className="min-w-full bg-white border mb-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Pekerjaan</th>
                  <th className="border px-4 py-2">Kelompok Umur</th>
                  <th className="border px-4 py-2">Laki-Laki</th>
                  <th className="border px-4 py-2">Perempuan</th>
                  <th className="border px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {data.pekerjaan && data.pekerjaan.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item['Pekerjaan']}</td>
                    <td className="border px-4 py-2">{item['Kelompok Umur']}</td>
                    <td className="border px-4 py-2">{item['Laki-Laki']}</td>
                    <td className="border px-4 py-2">{item['Perempuan']}</td>
                    <td className="border px-4 py-2">{item['Jumlah']}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-4">Hubungan Keluarga</h2>
            <table className="min-w-full bg-white border mb-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Hubungan</th>
                  <th className="border px-4 py-2">Kelompok Umur</th>
                  <th className="border px-4 py-2">Laki-Laki</th>
                  <th className="border px-4 py-2">Perempuan</th>
                  <th className="border px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {data.hubungan_keluarga && data.hubungan_keluarga.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item['Hubungan']}</td>
                    <td className="border px-4 py-2">{item['Kelompok umur']}</td>
                    <td className="border px-4 py-2">{item['Laki-Laki']}</td>
                    <td className="border px-4 py-2">{item['Perempuan']}</td>
                    <td className="border px-4 py-2">{item['Jumlah']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Import Modal">
        <h2 className="text-xl font-semibold mb-4">Import Data</h2>
        <input type="file" onChange={handleFileChange} className="mb-4" />
        {confirmImportVisible ? (
          <div className="text-right">
            <p className="mb-4">Are you sure you want to import this data?</p>
            <button onClick={closeModal} className="mr-4 bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
            <button onClick={importData} className="bg-blue-500 text-white py-2 px-4 rounded">Confirm</button>
          </div>
        ) : (
          <div className="text-right">
            <button onClick={closeModal} className="mr-4 bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
            <button onClick={handleConfirmImport} className="bg-blue-500 text-white py-2 px-4 rounded">Import</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DataPenduduk;
