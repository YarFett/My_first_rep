import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Ваш код для обработки регистрации пользователя
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className='cb-text-field__input input'
        placeholder='Введите email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input className='cb-text-field__input input'
        type="password"
        placeholder='Введите пароль'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input className='cb-text-field__input input'
        type="password"
        placeholder='Повторите пароль'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className='cb-button' type="submit" color="primary" style={{ marginTop: '24px' }}>
        Зарегистрироваться
      </button>
    </form>
  );
};

export default Registration;