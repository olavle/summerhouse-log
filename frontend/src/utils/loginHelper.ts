import axios from 'axios';

// const baseUrl = `http://kotiservu:3001`;
const baseUrl = `http://localhost:3001`;

interface ReturnData {
  message: string;
}

interface Credentials {
  username: string;
  password: string;
  keepLoggedIn: boolean;
}

const login = async (userCredentials: Credentials): Promise<ReturnData> => {
  // const request = axios.post(`${baseUrl}/api/login`, userCredentials);
  // console.log((await request).data);
  // axios
  //   .post(`${baseUrl}/api/login`, userCredentials, { withCredentials: true })
  //   .then((res) => {
  //     return res;
  //   })
  //   .catch((err) => console.log('err', err));
  const response = await axios.post(`${baseUrl}/api/login`, userCredentials, {
    withCredentials: true,
  });
  return await response.data;
};

const userLoggedIn = (token: string | undefined): boolean => {
  if (token) {
    return true;
  }
  return false;
};

export default {
  login,
  userLoggedIn
};
