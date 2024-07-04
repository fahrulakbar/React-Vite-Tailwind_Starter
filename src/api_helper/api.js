// src/api.js
import useAppContext from "../context/useAppContext";

const { axiosInstance } = useAppContext();


export const getPembangunanList = async () => {
  const response = await axiosInstance.get(`/pembangunan`, {
    headers: { 'Accept': 'application/json' },
  });
  return response.data;
};

export const getPembangunanDetail = async (id) => {
  const response = await axiosInstance.get(`/pembangunan/${id}`, {
    headers: { 'Accept': 'application/json' },
  });
  return response.data;
};

export const createPembangunan = async (data) => {
  const response = await axiosInstance.post(`/pembangunan`, data, {
    headers: { 'Accept': 'application/json' },
  });
  return response.data;
};

export const updatePembangunan = async (id, data) => {
  const response = await axiosInstance.put(`/pembangunan/${id}`, data, {
    headers: { 'Accept': 'application/json' },
  });
  return response.data;
};
