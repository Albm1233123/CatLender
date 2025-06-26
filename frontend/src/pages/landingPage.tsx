import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Divider, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

    return (
        <Box>
            {isLoggedIn ? 
            <>
                <Typography>Welcome back, {firstName}!</Typography>
                <Button onClick={logout}>Log out</Button>
            </> : 
                <Typography>Please log in</Typography>}
        </Box>
    );
}

export default LandingPage;
