import React from 'react';

const LoginButton = () => {
  const handleLogin = () => {
    // Realize o redirecionamento para o endpoint de autenticação do OAuth2 no backend
    window.location.href = 'http://localhost:3009/auth/github/callback';
  };

  return (
    <button onClick={handleLogin}>
      Login com OAuth2
    </button>
  );
};

const LogoutButton = () => {
    const handleLogout = () => {
      // Realize o redirecionamento para o endpoint de autenticação do OAuth2 no backend
      window.location.href = 'http://localhost:3009/logout';
    };
  
    return (
      <button onClick={handleLogout}>
        Login com OAuth2
      </button>
    );
  };

export {LoginButton, LogoutButton} ;
