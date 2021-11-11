import axios from 'axios';

const baseUrl = `http://localhost:3001`;

interface Credentials {
  username: string;
  password: string;
  keepLoggedIn: boolean;
}

const login = (userCredentials: Credentials) => {
  // const request = axios.post(`${baseUrl}/api/login`, userCredentials);
  // console.log((await request).data);
  axios
    .post(`${baseUrl}/api/login`, userCredentials)
    .then((res) => {
      console.log(res)
  })
    .catch((err) => console.log('err', err));
};

export default {
  login,
};
