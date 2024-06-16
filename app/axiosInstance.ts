import axios from "axios";
import { useUser } from "./context/AuthContext";

const axiosInterceptorInstance = axios.create({
    baseURL: 'https://dummyjson.com/', // Replace with your API base URL
  });
  
  // Request interceptor
  axiosInterceptorInstance.interceptors.request.use(
    (config) => {
      // Modify the request config here (add headers, authentication tokens)
      const accessToken = localStorage.getItem("user");
  
      // If token is present, add it to request's Authorization Header
      if (accessToken) {
        if (config.headers) config.headers.Authorization = `Bearer ${JSON.parse(accessToken).token}`;
      }
      return config;
    },
    (error) => {
      // Handle request errors here
      return Promise.reject(error);
    }
  );
  
  // Response interceptor
  axiosInterceptorInstance.interceptors.response.use(
    (response) => {
      // Modify the response data here
      return response;
    },
    (error) => {
      // Handle response errors here
      return Promise.reject(error);
    }
  );
  
  export default axiosInterceptorInstance;
