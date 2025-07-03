import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Divider, useTheme, Grid, Paper, styled} from '@mui/material';
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
        <>
            <NavBar
                isLoggedIn={isLoggedIn}
                firstName={firstName}
                onLogout={logout}
            ></NavBar>
            <SideBar/>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 2,
                    p: 3,
                    mt: 5,
                    maxWidth: '1200px',
                    mx: 'auto',
                }}
                >
                {/*Cat profile*/}
                <Box sx={{ flex: '1 1 300px', p: 2, bgcolor: 'background.paper', borderRadius: 1}}>Card 1</Box>

                {/*Calender analytics*/}
                <Box sx={{ flex: '1 1 300px', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>Card 2</Box>

                {/*Events*/}
                <Box sx={{ flex: '1 1 300px', p: 2, bgcolor: 'background.paper', borderRadius: 1}}>Card 3</Box>

                {/*Other cats or something else*/}
                <Box sx={{ flex: '1 1 300px', p: 2, bgcolor: 'background.paper', borderRadius: 1}}>Card 4</Box>
            </Box>
        </>
    );
}

export default LandingPage;
