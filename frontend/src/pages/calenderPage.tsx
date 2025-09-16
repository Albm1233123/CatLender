import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Components
import NavBar from '../components/navbar';
import SideBar from '../components/sidebar';
import CatCalendar from '../components/calender';

function CalenderPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState('');
    
    useEffect(() => {
        const name = localStorage.getItem('firstName');
        if (token) setIsLoggedIn(true);
        if (name) setFirstName(name);
    }, []);
    
    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/');
    };

	return (
        <>
            <NavBar
                isLoggedIn={isLoggedIn}
                firstName={firstName}
                onLogout={handleLogout} 
            />
            
            <CatCalendar events={[]} />
            
            <SideBar />
        </>
	);
}

export default CalenderPage;