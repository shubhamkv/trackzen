import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await chrome.storage.local.get("trackzen_token");
  //console.log(token);
  const jwtToken = token.trackzen_token;
  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  }
  return config;
});
