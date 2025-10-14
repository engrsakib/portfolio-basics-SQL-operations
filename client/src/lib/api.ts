

import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:5000";

const api = axios.create({
  baseURL: `${baseUrl}/api/v1`,
  withCredentials: true,
});

export default api;








