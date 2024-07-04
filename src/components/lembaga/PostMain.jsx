import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppContext from '../../context/useAppContext';
import { toast } from 'react-toastify';

const PostMain = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { axiosInstance } = useAppContext(); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/post');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/post/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error('Error deleting data');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (slug) => {
    navigate(`${slug}`);
  };

  const handleCreatePost = () => {
    navigate(`new`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">POST</h1>

      <div className="flex  mb-6 ms-0">
        <button
          onClick={handleCreatePost}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Add Post
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-solid border-t-transparent rounded-full"></div>
        </div>
      )}


      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div key={item.id} className="bg-white p-6 border-2 border-red-100 rounded shadow-md hover:shadow-lg transition-shadow duration-200">
            <img src={item.thumbnail} alt={item.judul} className="mb-4 rounded" />
            <h2 className="text-lg font-bold mb-2">{item.judul}</h2>
            <p className="text-gray-600 mb-2">{item.slug}</p>
            <p className="text-gray-800 mb-2">{item.isi}</p>
            <p className="text-gray-500 mb-4">Author: {item.author.nama}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleViewDetail(item.slug)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
              >
                View
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostMain;
