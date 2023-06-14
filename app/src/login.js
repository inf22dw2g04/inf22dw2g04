import React from 'react';
import axios from 'axios';

const Login = () => {
  const handleLogin2 = async () => {
    try {
      const response = await axios.get(`http://${window.location.hostname}:3009/auth/google`);
      // Redirecionar para a rota de autenticação do backend
      window.location.href = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
          <button className='submit-button' onClick={handleLogin2}>Login</button>
    
  );
};

export default Login;