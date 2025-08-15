import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar';
import SideBar from '../components/sidebar';
import { useNavigate } from 'react-router-dom';
import CatEvents from '../components/events';
import SearchBar from '../components/searchBar'; 

  const myEvents = [
    {
      id: 1,
      catId: 1,
      title: "Vet Visit",
      date: "2025-07-10",
      type: "Health",
      notes: "Routine checkup"
    },
    {
      id: 2,
      catId: 2,
      title: "Birthday",
      date: "2025-08-01",
      type: "Celebration"
    }
  ];

function EventsPage () {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
      
    useEffect(() => {
        const name = localStorage.getItem("firstName");
        if (token) setIsLoggedIn(true);
        if (name) setFirstName(name);

      }, []);
    
    
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        setIsLoggedIn(false);
        setFirstName('');
        navigate('/');
    };

    const handleSearch = () => {
        // work in porgress
    };

    return (
        <>
        <NavBar isLoggedIn={isLoggedIn} firstName={firstName} onLogout={logout} />
        <SideBar />
       <Box
            sx={{
                display: 'flex',
                flexDirection: 'column', 
                gap: 2,
                p: 3,
                mt: 5,
                maxWidth: '1200px',
                mx: 'auto',
            }}
            >
            {/* Top row: Search bar centered, button left */}
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                }}
            >
                {/* Left: Add Event button - make a new form page popup for event adding */}
                <Button>Add Event</Button>

                {/* Right: Search Bar */}
                <Box sx={{ width: '300px' }}>
                <SearchBar onSearch={handleSearch} />
                </Box>
            </Box>

            {/* Events box below */}
            <Box
                sx={{
                flex: '1 1 300px',
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                width: '50%',
                }}
            >
                Upcoming events
                <CatEvents events={myEvents} />
            </Box>
            </Box>
        </>
    );
}
export default EventsPage;

