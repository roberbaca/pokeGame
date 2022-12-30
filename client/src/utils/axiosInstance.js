import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://whos-that-pokemon.onrender.com/api" // mi backend
    //baseURL: "http://localhost:3100/api"                // mi localhost
});

export default axiosInstance;