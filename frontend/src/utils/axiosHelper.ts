import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const get = async <Type>(url: string): Promise<Type> => {
  const response = await axios.get(`${baseUrl}/${url}`, {withCredentials: true});
  return await response.data;
};

export default {
  get,
};
