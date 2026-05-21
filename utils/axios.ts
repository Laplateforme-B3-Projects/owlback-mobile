import useToken from '@/hook/useToken';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_URL,
});

const { getToken } = useToken();
// Intercepteur — injecte le token sur chaque requête
axiosInstance.interceptors.request.use(async (config) => {
  const token = await getToken(); // ton hook useToken
  console.log(process.env.EXPO_PUBLIC_URL, token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
