import '../src/scss/global.scss'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// if (process.env.REACT_APP_BACKEND_URL) {
//   axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL
// //  axios.defaults.baseURL = 'http://192.168.97.173:8888/api/';
// }
// else {
//   axios.defaults.baseURL = 'http://localhost:8000/api/';
// }
// console.log(axios.defaults)
// console.log(process.env)
// axios.defaults.withCredentials = true;

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// reportWebVitals();


// axios.defaults.baseURL = 'http://192.168.97.173:8888/api/';
axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
