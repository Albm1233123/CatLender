import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Divider, useTheme, Grid, Paper, styled} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// components
import NavBar from '../components/navbar';
import SideBar from '../components/sidebar';
import CatSelector from '../components/catSelector';
import CatCalendar from '../components/calender'; 
import CatEvents from '../components/events';

// placeholder
import dogPlaceholder from '../assets/dogPlaceholder.png';
import cat from '../assets/cat.png';
import noSmile from '../assets/noSmile.png';
import { Cat } from '../components/eventModal';

// placeholder
const dummyCats = [
  { id: 1, name: 'Dog', age: 1, breed: 'Siamese', gender: 'cat', avatar: dogPlaceholder },
  { id: 2, name: 'Mittens', age: 3, breed: 'Maine Coon', gender: 'female', avatar: cat },
  { id: 3, name: 'KitKat', age: 2, breed: 'Bengal', gender: 'male', avatar: noSmile }
];

const dummyEvents = [
    { id: 1, catId: 1, title: 'Vet Visit', date: '2025-07-08', type: 'Medical', notes: 'Annual checkup' },
    { id: 2, catId: 2, title: 'Grooming', date: '2025-07-08', type: 'Care' },
    { id: 3, catId: 3, title: 'Playdate', date: '2025-07-09', type: 'Fun' }
  ];

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


function LandingPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [selectedCat, setSelectedCat] = useState<Cat | null>(dummyCats[0] ?? null);
    const navigate = useNavigate();

    const filteredEvents = selectedCat ? dummyEvents.filter(event => event.catId === selectedCat.id) : [];

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("firstName");

        if(token) setIsLoggedIn(true);
        if(name) setFirstName(name);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        setIsLoggedIn(false);
        setFirstName('');
        navigate('/');
    };

    const theme = useTheme();

    return (
        <>
            <NavBar
                isLoggedIn={isLoggedIn}
                firstName={firstName}
                onLogout={logout}
            />
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
                {/* Cat profile */}
                <Box sx={{ flex: '1 1 100px', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    Cat object selection
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <img
                            src={selectedCat?.avatar ?? ''}
                            alt={selectedCat?.name ?? 'No Cat'}
                            style={{ width: '60%', borderRadius: '8px' }}
                        />
                        <Typography variant="h6" mt={2}>{selectedCat?.name ?? 'No Cat'}</Typography>
                        <Typography>Age: {selectedCat?.age ?? '-'}</Typography>
                        <Typography>Breed: {selectedCat?.breed ?? '-'}</Typography>
                        <Typography>Gender: {selectedCat?.gender ?? '-'}</Typography>
                    </Box>
                    <CatSelector
                        cats={dummyCats}
                        selectedCat={selectedCat}
                        setSelectedCat={setSelectedCat}
                    />
                </Box>

                {/* Calendar analytics */}
                <Box sx={{ flex: '1 1 300px', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    Calendar or data box
                    <CatCalendar events={filteredEvents} />
                </Box>

                {/* Events */}
                <Box sx={{ flex: '1 1 300px', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    Upcoming events
                    <CatEvents events={myEvents} />
                </Box>

                {/* Other cats or something else */}
                <Box sx={{ flex: '1 1 300px', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    Card 4
                </Box>
            </Box>
        </>
    );
}

export default LandingPage;
