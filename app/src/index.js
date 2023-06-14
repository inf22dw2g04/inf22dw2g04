import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import Imagem from './transp2.png';





import App from './App';

const App2 = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  
  const handleLogin = () => {
    axios.get(`http://${window.location.hostname}:3009/auth/google`) 
    .then(response => {
      window.open(response.data.callback, "_top","resizable=no,menubar=no,titlebar=no,toolbar=no");
    })
    .catch(error => {
      console.log(error);
    });
    setLoggedIn(true);
  };
  
  const handleLogout = () => {
    axios.get(`http://${window.location.hostname}:3009/logout`)
    .then(response => {
      window.location.href = '/';
    })
    .catch(error => {
      console.log(error);
    });
    setLoggedIn(false);
  };
  
  return (
    <React.StrictMode>
      {loggedIn ? (
        <>
            <App />
            <div className='login-out-bottom'>
            <button className='submit-button3' onClick={handleLogout}>Logout</button>
          </div>
          <div className='rights'>&copy;Pime Haul - 2023&nbsp;</div>
        </>
      ) : (
        <>
        <h1 className='loginPage'>Prime Haul - Logistics</h1>
        <img className='image' src={Imagem} alt="Descrição da Imagem" />
        <div className='login-out-bottom'>
          <button className='submit-button2' onClick={handleLogin}>Login</button>
        </div>
        <div className='rights'>&copy;Prime Haul - 2023&nbsp;</div>
        </>
      )}
    </React.StrictMode>
    
  );
};

ReactDOM.render(<App2 />, document.getElementById('root'));


