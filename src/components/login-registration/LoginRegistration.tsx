import React from 'react';
import Login from './Login';
import Register from './Registration';
import PageHeader from '../page-header/page-header';
import { SearchProvider } from '../context_for_search';
import '../check_instance_elem/comments-page.scss'

function LoginRegistration() {
    return (
        <SearchProvider>
            <PageHeader />
            <div className='order__container container'>
                <div className='comments-page__card'>
                    <h1>Вход</h1>
                    <Login />
                </div>
                <div className='comments-page__card' style={{marginTop: '24px'}}>
                <h1>Регистрация</h1>
                <Register />
                </div>
            </div>
        </SearchProvider>
    );
};

export default LoginRegistration;