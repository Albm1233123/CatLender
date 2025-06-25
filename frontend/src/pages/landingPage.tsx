import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Divider, useTheme } from '@mui/material';

function LandingPage() {
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[firstName, setFirstName] = useState('');

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem('firstName');

        console.log('Token on landing page:', token);
        if(token) {
            setIsLoggedIn(true);
        }
        if(name) {
            setFirstName(name);
        }
    }, []);

    // loutout
    // cosnt logout
    // removeitem 
    // set profile stuff to false or empty string;

    return (
        <Box>
            {isLoggedIn ? 
            <>
                <Typography>Welcome back, {firstName}!</Typography>
                <Button>Log out</Button>
            </> : 
                <Typography>Please log in</Typography>}
        </Box>
    );
}

export default LandingPage;
