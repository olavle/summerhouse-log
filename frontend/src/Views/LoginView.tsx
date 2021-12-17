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
    <div style={{padding: "24px"}}>
      <div
        style={{
          border: '1px solid black',
          borderRadius: '5px',
          padding: '16px',
          textAlign: "center"
        }}>
        <div style={{padding: "16px"}}>Tervetuloa!<br /> Ole hyvä ja kirjaudu sisään</div>
        <div style={{padding: "16px"}}>
          <label htmlFor='username'>Käyttäjätunnus</label>
          <input
            onChange={handleUsernameChange}
            type='text'
            name='username'
            placeholder='Käyttäjätunnus'
          />
        </div>
        <div style={{padding: "16px"}}>
          <label htmlFor='password'>Salasana</label>
          <input
            onChange={handlePasswordChange}
            type='password'
            name='password'
            placeholder='Salasana'
          />
        </div>
        <div style={{padding: "16px"}}>
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
      <div style={{padding: "16px"}}>
        <a style={{textDecoration: "none", color: "black"}} href="#">Luo uusi käyttäjä...</a>
      </div>
    </div>
  );
};

export default LoginView;
