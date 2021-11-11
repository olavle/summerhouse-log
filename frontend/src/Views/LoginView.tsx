import React from 'react';
import { loginUser } from '../state/reducer';
import { useStateValue } from '../state/state';
import loginHelper from '../utils/loginHelper';
import Cookies from 'js-cookie';

// interface Credentials {
//   username: string;
//   password: string;
// }

const LoginView = () => {
  const [{ isLoggedIn, username, userPassword, stayLoggedIn }, dispatch] =
    useStateValue();
  // const [credentials, setCredentails] = React.useState<Credentials>({
  //   username: '',
  //   password: '',
  // });

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'SET_USERNAME',
      payload: event.target.value,
    });
  };
  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'SET_PASSWORD',
      payload: event.target.value,
    });
  };
  const handleStayLoggedInChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'STAY_LOGGEDIN',
      payload: !stayLoggedIn,
    });
  };

  const handleLogin = () => {
    loginHelper.login({
      username,
      password: userPassword,
      keepLoggedIn: stayLoggedIn,
    });
    console.log('here is cookies.get', Cookies.get('token'))
  };

  return (
    <div>
      <div>Tervetuloa! Ole hyvä ja kirjaudu sisään</div>
      <div>
        <label htmlFor='username'>Käyttäjätunnus</label>
        <input
          onChange={handleUsernameChange}
          type='text'
          name='username'
          placeholder='Käyttäjätunnus'
        />
      </div>
      <div>
        <label htmlFor='password'>Salasana</label>
        <input
          onChange={handlePasswordChange}
          type='password'
          name='password'
          placeholder='Salasana'
        />
      </div>
      <div>
        <label htmlFor='stayLoggedIn'>Pysy sisäänkirjautuneena</label>
        <input
          checked={stayLoggedIn}
          onChange={handleStayLoggedInChange}
          type='checkbox'
          name='stayLoggedIn'
        />
      </div>
      <button
        onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginView;
