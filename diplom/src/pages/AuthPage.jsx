import React, { useState } from 'react';
import '../styles/AuthPage.css';

export default function AuthPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    const correctUsername = 'admin';
    const correctPassword = '1234';

    if (username === correctUsername && password === correctPassword) {
      setErrorMessage('');
      alert('Успешный вход!');
    } else {
      setErrorMessage('Неверное имя пользователя или пароль');
    }
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
        {errorMessage && <p className="login-error">{errorMessage}</p>}
        <p className="forgot-password">Забыли пароль?</p>
      </div>
    </div>
  );
}
