import React from 'react';
import { useStateValue } from '../state/state';
import loginHelper from '../utils/loginHelper';

// interface Credentials {
//   username: string;
//   password: string;
// }

const LoginView = () => {
  const [{ username, userPassword, stayLoggedIn }, dispatch] = useStateValue();
  // const [credentials, setCredentails] = React.useState<Credentials>({
  //   username: '',
  //   password: '',
  // });

  // console.log('here is cookies.get', Cookies.get('token'))

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
  const handleStayLoggedInChange = () => {
    dispatch({
      type: 'STAY_LOGGEDIN',
      payload: !stayLoggedIn,
    });
  };

  const handleLogin = async (): Promise<void> => {
    try {
      const loginResponse = await loginHelper.login({
        username,
        password: userPassword,
        keepLoggedIn: stayLoggedIn,
      });
      if (loginResponse.message === 'Logged in!') {
        dispatch({
          type: 'LOGIN',
          payload: true,
        });
      } else {
        window.alert('Wrong credentials');
      }
    } catch (error) {
      console.log(error);
    }
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginView;
