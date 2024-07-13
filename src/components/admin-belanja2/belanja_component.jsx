import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAppContext from '../../context/useAppContext';
import Modal from 'react-modal';

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

const BelanjaComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [modalType, setModalType] = useState('view'); // can be 'view', 'edit', or 'delete'
  const { axiosInstance } = useAppContext();

  useEffect(() => {
    axiosInstance.get('/belanja-desa')
      .then(response => {
        if (response.data.success) {
          setPosts(response.data.data.data);
        } else {
          setError('Failed to fetch data');
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [axiosInstance]);

  const handleOpenModal = (post, type) => {
    setCurrentPost(post);
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentPost(null);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    // Handle delete logic here
    handleCloseModal();
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Belanja Desa</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Judul</th>
              <th className="px-4 py-2">Pembuat</th>
              <th className="px-4 py-2">Opt</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{post.judul}</td>
                <td className="px-4 py-2">{post.author.nama} ({post.author.email})</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleOpenModal(post, 'view')} className="text-blue-500 hover:underline mr-4">Lihat</button>
                  <button onClick={() => handleOpenModal(post, 'edit')} className="text-green-500 hover:underline mr-4">Edit</button>
                  <button onClick={() => handleOpenModal(post, 'delete')} className="text-red-500 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} style={customStyles} contentLabel="Post Modal">
        {modalType === 'view' && currentPost && (
          <div className="p-5">
            <h1 className="text-3xl font-bold mb-5">{currentPost.judul}</h1>
            {currentPost.thumbnail && (
              <img src={currentPost.thumbnail} alt={currentPost.judul} className="mb-5 w-full max-w-lg mx-auto rounded-lg" />
            )}
            <p className="mb-5">{currentPost.isi}</p>
            <p className="text-sm text-gray-600"><strong>Author:</strong> {currentPost.author.nama} ({currentPost.author.email})</p>
            <button onClick={handleCloseModal} className="text-blue-500 hover:underline mt-5">Close</button>
          </div>
        )}
        {modalType === 'edit' && currentPost && (
          <EditPostForm post={currentPost} onClose={handleCloseModal} />
        )}
        {modalType === 'delete' && currentPost && (
          <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Delete Post</h1>
            <p>Are you sure you want to delete this post?</p>
            <div className="mt-5">
              <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded mr-4">Delete</button>
              <button onClick={handleCloseModal} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const EditPostForm = ({ post, onClose }) => {
  const [formData, setFormData] = useState({
    judul: post?.judul || '',
    isi: post?.isi || '',
    author: post?.author || { nama: '', email: '' },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
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
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          name="isi"
          value={formData.isi}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Author Name</label>
        <input
          type="text"
          name="author.nama"
          value={formData.author.nama}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Author Email</label>
        <input
          type="email"
          name="author.email"
          value={formData.author.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div className="text-right">
        <button type="button" onClick={onClose} className="mr-4 bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
      </div>
    </form>
  );
};

export default BelanjaComponent;
