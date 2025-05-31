import React, { useState } from 'react';
import '../styles/AuthPage.css';
import { loginUser } from '../utils/client';
import {Navigate} from "react-router-dom";

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = () => {
    loginUser({email, password})
        .then(res => {
            if (res) {
                alert('Login successful');
                setLoginSuccess(true);
            } else {
                setErrorMessage('Login failed');
            }
        })
    // console.log('Логин:', username);
    // console.log('Пароль:', password);
  };
  return (
    <div className="login-container">
      {loginSuccess && <Navigate replace to='/' />}
      <div className="login-box">
        <h2 className="login-title">Вход в систему</h2>
        <input
          type="text"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
