import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Divider, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import SideBar from '../components/sidebar';

function LandingPage() {
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[firstName, setFirstName] = useState('');
    const navigate = useNavigate();

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("firstName");

        console.log('Token on landing page:', token);
        if(token) {
            setIsLoggedIn(true);
        }
        if(name) {
            setFirstName(name);
        }
    }, []);

    // logout
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        setIsLoggedIn(false);
        setFirstName('');

        // logs
        console.log("Token after removal:", localStorage.getItem("token"));
        console.log("Name after removal:", localStorage.getItem("firstName"));
        console.log("Logged in status:", isLoggedIn);
        navigate('/');
    }

    const theme = useTheme();

    return (
        <><NavBar
            isLoggedIn={isLoggedIn}
            firstName={firstName}
            onLogout={logout}
        ></NavBar>
        <SideBar/>
    
        <Box>
                
        </Box></>
    );
}

export default LandingPage;
