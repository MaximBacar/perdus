import axios from 'axios';
import { auth } from '@/lib/firebase';

const BASE_URL = `${import.meta.env.VITE_API_PROTOCOL}://${import.meta.env.VITE_API_BASE_URL}`;

export const api = axios.create({
  baseURL: BASE_URL,
  paramsSerializer: {
    indexes: null // Serialize arrays as: platforms=1&platforms=2 instead of platforms[0]=1&platforms[1]=2
  }
});

api.interceptors.request.use(async (config) => {
  const token = await auth.currentUser.getIdToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});