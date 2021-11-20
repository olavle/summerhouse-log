import React from 'react';
import './styles/App.css';
import LoggedInView from './Views/LoggedInView';
import { useStateValue } from './state/state';
import LoginView from './Views/LoginView';
import Cookies from 'js-cookie';
import loginHelper from './utils/loginHelper';
import { loginUser, logoutUser } from './state/reducer';

const App = () => {
  const [{ isLoggedIn }, dispatch] = useStateValue();

  React.useEffect(() => {
    if (loginHelper.userLoggedIn(Cookies.get('token'))) {
      dispatch(loginUser());
    } else {
      dispatch(logoutUser());
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    loginHelper
      .logout()
      .then(() => {
        dispatch(logoutUser());
      })
      .catch((err) => console.log(err));
  };

  // Being logged in doesn't matter that much, redirect the user to login when fetching data that is behind authorization

  // **********
  // **********
  // https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs
  // https://stackoverflow.com/questions/61997401/how-to-logout-user-when-token-expires-in-react-app
  // **********
  // **********

  return (
    <div className='App'>{isLoggedIn ? <LoggedInView handleLogout={handleLogout} /> : <LoginView />}</div>
  );
};

export default App;
