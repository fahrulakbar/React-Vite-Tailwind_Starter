import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAppContext from '../../context/useAppContext';

const BelanjaDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { axiosInstance } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/belanja-desa/${slug}`)
      .then(response => {
        if (response.data.success) {
          setPost(response.data.data);
        } else {
          setError('Failed to fetch data');
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [slug]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!post) {
    return <div className="text-center py-10">Post not found</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <button onClick={handleBack} className="text-blue-500 hover:underline mb-5 inline-block">Back to List</button>
      <div className="border p-5 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-5">{post.judul}</h1>
        {post.thumbnail && (
          <img src={post.thumbnail} alt={post.judul} className="mb-5 w-full max-w-lg mx-auto rounded-lg" />
        )}
        <p className="mb-5">{post.isi}</p>
        <p className="text-sm text-gray-600"><strong>Author:</strong> {post.author.nama} ({post.author.email})</p>
      </div>
    </div>
  );
};

export default BelanjaDetail;
