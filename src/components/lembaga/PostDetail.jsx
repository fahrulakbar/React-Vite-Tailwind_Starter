import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAppContext from '../../context/useAppContext';
import { toast } from 'react-toastify';

const PostDetail = () => {
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const { axiosInstance } = useAppContext();

  useEffect(() => {
    fetchDetail();
  }, [slug]);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/post/${slug}`);
      setDetailData(response.data.data);
    } catch (error) {
      console.error('Error fetching detail:', error);
      toast.error('Error fetching detail');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/post/edit/${slug}`);
  };

  return (
    <div className="container mx-auto p-6">
      {loading && (
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-solid border-t-transparent rounded-full"></div>
        </div>
      )}

      {detailData && (
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mb-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
          >
            Back
          </button>
          <div className="bg-white p-6 rounded shadow-md">
            <img src={detailData.thumbnail} alt={detailData.judul} className="mb-4 rounded" />
            <h2 className="text-3xl font-bold mb-2">{detailData.judul}</h2>
            <p className="text-gray-600 mb-2">{detailData.slug}</p>
            <p className="text-gray-800 mb-2">{detailData.isi}</p>
            <p className="text-gray-500 mb-4">Author: {detailData.author.nama}</p>
            <p className="text-gray-500 mb-4">Created At: {new Date(detailData.created_at).toLocaleString()}</p>
            <p className="text-gray-500 mb-4">Updated At: {new Date(detailData.updated_at).toLocaleString()}</p>
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-200"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
