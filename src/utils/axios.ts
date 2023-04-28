import axios from "axios";

const instance = axios.create({
  // baseURL: 'http://localhost:8800/api',
  baseURL: 'https://youtube-server.cyclic.app/api',
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  },
})

  instance.interceptors.response.use(response => {
    return response;
  }, error => {
    return Promise.reject(error);
  });
// instance.interceptors.request.use((config) => {
//   config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
//   return config;
// },
//   error => {
//     return Promise.reject(error);
//   }
// );

export default instance


