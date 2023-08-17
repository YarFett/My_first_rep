import React, { Component, useContext, useEffect, useState } from "react";
import {Logo} from "../logo/logo";
import './page-header.scss';
import PropTypes from 'prop-types';
import { Service } from "../api_params/service";

import axios from "axios";
import { TextChange } from "typescript";
import AppList from "../app-list/app-list";
import { SearchContext } from "../context_for_search";
import { Link } from "react-router-dom";



function PageHeader() {

  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useContext(SearchContext);

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = async () => {
    try {
      if (Number(inputValue)){
        const url = `services/service/?id=${Number(inputValue)}`;
        const response = await axios.get(url);
        const newData = await response.data;
        setSearchResult(newData)
      }
      else{
        const url = `services/service/?search=${String(inputValue)}`;
        const response = await axios.get(url);
        const newData = await response.data;
        setSearchResult(newData);
        console.log(typeof(inputValue))
        console.log(url)
        console.log(newData)
        console.log(searchResult)
      }
      // console.log(searchResult)
      // console.log(searchResult, typeof (setSearchResult), inputValue)
    } catch (error) {
      console.error("Вот твоя ошибка", error);
    }
  };

  return (
    <header className="page-header" style={{position: "sticky", top: 0, zIndex: 1}}>
      <div className="page-header__container container">
        <Logo />
        <ul className="page-header__site-navigation">
          <li className="page-header__site-navigation-item">
            <input id="Search" className="cb-search-field__input" type="text" value={inputValue} placeholder="Искать здесь..." onChange={handleInputChange} />
          </li>
          <button id="SerchClick" className="cb-buttonsearch cb-icon-search" onClick={handleSearchClick}></button>
        </ul>
        <ul className="page-header__icon-navigation">
          <li className="page-header__icon-navigation-item">
            <span className="cb-icon cb-icon__size-24">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.2775 17.8831L5.91126 15.0659L8.54746 7.49991C9.32077 5.28049 11.6703 4.04247 13.9396 4.65866L14.4601 4.80001C16.7295 5.41619 18.1533 7.6788 17.728 9.99269L16.2775 17.8831ZM3.96233 16.0983L3.96478 16.0912L3.00049 15.8292L3.38361 14.3789L4.45952 14.6713L7.13353 6.99683C8.16461 4.0376 11.2973 2.38692 14.323 3.2085L14.8436 3.34985C17.8693 4.17143 19.7679 7.18824 19.2007 10.2734L17.7293 18.2777L18.8044 18.5699L18.4213 20.0201L17.4571 19.7581L17.4563 19.7623L16.0045 19.3681L14.4434 18.9442C13.5698 20.5132 11.731 21.3485 9.93451 20.8607C8.13799 20.3728 6.9577 18.7178 6.97534 16.9164L5.41419 16.4925L3.96233 16.0983ZM8.49867 17.33C8.63921 18.3077 9.33741 19.1442 10.318 19.4105C11.2985 19.6767 12.3159 19.3061 12.92 18.5306L8.49867 17.33Z" fill="#0D4CD3" />
                <path d="M22 12C22 14.2091 20.2091 16 18 16C15.7909 16 14 14.2091 14 12C14 9.79086 15.7909 8 18 8C20.2091 8 22 9.79086 22 12Z" fill="#EE3F58" />
              </svg>
            </span>
          </li>
        </ul>
        <ul className="page-header__site-navigation">
          <li className="page-header__site-navigation-item">
            <Link to={'/requirements'} className="page-header__site-navigation-link">Настройки</Link>
          </li>
          <li className="page-header__site-navigation-item">
            <a href="" className="page-header__site-navigation-link">Каталог ЦП</a>
          </li>
          <li className="page-header__site-navigation-item">
            <Link to='/login-registration' className="page-header__site-navigation-link">Войти/Зарегистрироваться </Link>
          </li>
        </ul>
      </div>
    </header>


  )
}



export default PageHeader;



// import React, { createContext, useEffect, useState } from 'react'; 
// import axios from 'axios';  
// export const DataContext = createContext();  
// const DataProvider = ({ children }) => {   
//     const [data, setData] = useState([]);    
//     useEffect(() => {     
//         axios.get('https://api.example.com/data')       
//         .then(response => setData(response.data))       
//         .catch(error => console.log(error))   }, []);    
//         return (     
//         <DataContext.Provider value={data}>       
//         {children}     
//         </DataContext.Provider>   
//         ) }  
//         export default DataProvider; 