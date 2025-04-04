// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api',
//   headers: {
//       'Content-Type': 'application/json',
//       // Add Authorization header if necessary
//   }
// });

// export default apiClient;

// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api', // Laravel API base URL
//   withCredentials: true, // Include cookies with requests
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default apiClient;

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default apiClient;
