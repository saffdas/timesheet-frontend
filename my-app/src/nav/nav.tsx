import React, { useEffect, useState } from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import Summary from '../summary/summary';
import TimeSheet from '../timesheet/detail/App'
import './nav.css'
import Profile from "../Profile/Profile";
import AuthService from "../services/auth.service";

export default function Navbar(): JSX.Element{
    const [display, setDisplay] = useState('summary');
    const navigate = useNavigate();

    const [authenticated, setauthenticated] = useState(false);

    function logout() {
        AuthService.logout();
        navigate("/");
    }

    // var loggedInUser = '';
    // useEffect(() => {
    //     loggedInUser = localStorage.getItem("token");
    //     if (loggedInUser) {
    //     setauthenticated((prevState) => true);
    //     console.log('token: '+loggedInUser)
    //     console.log('state: '+authenticated)
    //     }
    //     }, [localStorage.getItem("token")]);

    // if (!loggedInUser){
    //     alert('please log in')
    //     return (
            
    //         <Navigate to='/' replace={true}/>
    //     )
        
    // }
    // else{
        return (
            <div className='main-container'>


            <nav className='nav'>
                <div className='nav-container'>
                    <div className='nav-item' onClick={() => setDisplay('summary')}>Summary</div>
                    <div className='nav-item' onClick={() => setDisplay('timesheet')}>TimeSheet</div>
                    <div className='nav-item' onClick={() => setDisplay('profile')}>Profile</div>
                    <div className='nav-item' onClick={logout}>Logout</div>
                </div>
            </nav>
            <div className='content-container'>
                <div className='component summary'>
                    {display === 'summary' && <Summary/> }
                </div>
                <div className='component timesheet'>
                    {display === 'timesheet' && <TimeSheet/> }
                </div>
                <div className='component profile'>
                    {display === 'profile' && <Profile/> }
                </div>
            </div>
            </div>
        );
    
}