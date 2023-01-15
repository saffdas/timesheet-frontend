import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Login/Login';
import Navbar from './nav/nav';
import axios from 'axios';
import authHeader from './services/auth-header';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import RouteGuard from './GuardRoute/RouteGuard';



function App() {

  const [isAuth, setisAutheticated] = useState(false);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<RouteGuard />}>
            <Route path="/main" element={<Navbar />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

axios.interceptors.request.use(
  config => {
      console.log("Request intercepted!")
      const token = localStorage.getItem("token");
      if (token) {
          config.headers = authHeader();
      }
      return config
  },
  error => {
      Promise.reject(error)
  }
)

export default App;
