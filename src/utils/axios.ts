import axios from "axios";

const instance = axios.create({
  // baseURL: 'http://localhost:8800/api',
  baseURL: 'https://youtube-server.cyclic.app/api',
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`;
  return config;
},
  error => {
    console.log("ERROr", error)
    return Promise.reject(error);
  }
);

export default instance


