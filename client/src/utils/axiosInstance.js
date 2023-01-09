import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://pokegame-production.up.railway.app/api" // mi backend
    //baseURL: "http://localhost:3100/api"                // mi localhost
});

export default axiosInstance;