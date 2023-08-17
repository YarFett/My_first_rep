import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import '../../css/style.css'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Ваш код для обработки входа пользователя
    };

    return (
        <form onSubmit={handleSubmit}>
            <input className='cb-text-field__input input'
                value={email}
                placeholder='Введите email'
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                className='cb-text-field__input input'
                type="password"
                value={password}
                placeholder='Введите пароль'
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button className='cb-button' type="submit" color="primary" style={{marginTop: '24px'}}>
                Войти
            </button>
        </form>
    );
};

export default Login;