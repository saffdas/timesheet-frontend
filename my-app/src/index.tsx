import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import authHeader from "./services/auth-header";
import Login from "./Login/Login";
import TimeSheet from"./timesheet/detail/App"
import Navbar from './nav/nav';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
      {/* <Navbar/>
      <Login/>
      <TimeSheet/> */}
  </React.StrictMode>
);

// Add a request interceptor
// axios.interceptors.request.use(
//     config => {
//         console.log("Request intercepted!")
//         const token = localStorage.getItem("token");
//         if (token && config) {
//             config.headers = authHeader();
//         }
//         return config
//     },
//     error => {
//         Promise.reject(error)
//     }
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
