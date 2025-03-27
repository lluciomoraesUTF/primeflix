import axios from "axios";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

const backendApi = axios.create({
  baseURL: "http://localhost:5000/api/",
});

backendApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("⚠ Nenhum token encontrado no localStorage.");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const apis = { tmdbApi, backendApi };

export default apis;
