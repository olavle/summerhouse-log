import React from 'react';
import './styles/App.css';
import LoggedInView from './Views/LoggedInView';
import { useStateValue } from './state/state';
import LoginView from './Views/LoginView';

const App = () => {
  const [{ isLoggedIn }, dispatch] = useStateValue();

  return (
    <div className='App'>
      {isLoggedIn ? <LoggedInView /> : <LoginView />}
    </div>
  );
};

export default App;
