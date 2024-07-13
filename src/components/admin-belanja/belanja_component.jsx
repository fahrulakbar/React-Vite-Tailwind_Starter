import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAppContext from '../../context/useAppContext';

const BelanjaComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Belanja Desa</h1>
      {posts.length === 0 ? (
        <div className="text-center">No posts available</div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, index) => (
            <li key={index} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold mb-2">{post.judul}</h2>
              <p className="mb-4">{post.isi.substring(0, 100)}...</p>
              <Link to={`${post.slug}`} className="text-blue-500 hover:underline">
                Read More
              </Link>
              <p className="text-sm text-gray-600 mt-2"><strong>Author:</strong> {post.author.nama} ({post.author.email})</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BelanjaComponent;
