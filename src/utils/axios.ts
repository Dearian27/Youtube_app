import axios from "axios";

const instance = axios.create({
  // "proxy": "http://localhost:8800/api/"
  baseURL: 'http://localhost:8800/api',
  // withCredentials: true
})

instance.interceptors.request.use((config) => {

  config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  return config;
},
  error => {
    return Promise.reject(error);
  }
);

export default instance


