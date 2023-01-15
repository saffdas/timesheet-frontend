import React from 'react';
import Login from '../Login/Login';
import Navbar from '../nav/nav';

export default function RouteGuard():JSX.Element{
    if (localStorage.getItem('token')){
        console.log('token: ' + localStorage.getItem('token'))
        return <Navbar/ >
    }
    else{
        return <Login/ >
    }
}