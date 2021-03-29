import axios from "axios";

const api = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
