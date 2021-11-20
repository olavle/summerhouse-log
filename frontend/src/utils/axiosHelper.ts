import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});

const get = async <Type>(url: string): Promise<Type> => {
  const response = await axios.get(`${baseUrl}/${url}`, {
    withCredentials: true,
  });
  return await response.data;
};

const post = async <Type>(url: string, obj?: Type) => {
  const response = await axios.post(`${baseUrl}/${url}`, obj, {
    withCredentials: true,
  });
  return response;
};

const put = async <Type>(url: string, obj?: Type) => {
  const response = await axios.put(`${baseUrl}/${url}`, obj, {
    withCredentials: true,
  });
  return response;
};

export default {
  get,
  post,
  put,
};
