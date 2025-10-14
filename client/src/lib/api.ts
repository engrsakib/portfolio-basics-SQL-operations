

import axios from "axios";

const api = axios.create({
  baseURL: "https://a-7-portfolio-backend.vercel.app/api/v1",
  withCredentials: true, 
  
});

export default api;








