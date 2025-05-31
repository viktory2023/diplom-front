import React, { useState } from 'react';
import '../styles/AuthPage.css';

export default function AuthPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Логин:', username);
    console.log('Пароль:', password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Вход в систему</h2>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">Войти</button>
      </div>
    </div>
  );
}
