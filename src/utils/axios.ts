import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8800/api',
})

// instance.interceptors.request.use((config) => {
//   //   config.headers.Authorization = window.localStorage.getItem('token');

//   config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
//   return config;
// },
//   error => {
//     return Promise.reject(error);
//   }
// );

export default instance