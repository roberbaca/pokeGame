import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "pokegame-production-680b.up.railway.app/api" // mi backend
    //baseURL: "http://localhost:3100/api"                // mi localhost
});

export default axiosInstance;