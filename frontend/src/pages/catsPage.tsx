import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar';
import SideBar from '../components/sidebar';
import { useNavigate } from 'react-router-dom';
import CatSelector from '../components/catSelector';

// placeholder
import dogPlaceholder from '../assets/dogPlaceholder.png';
import cat from '../assets/cat.png';
import noSmile from '../assets/noSmile.png';
import { Button, colors, TextField, Typography, useTheme } from '@mui/material';

// placeholder
const dummyCats = [
  { id: 1, name: 'Dog', age: 1, breed: 'Siamese', gender: 'cat', avatar: dogPlaceholder },
  { id: 2, name: 'Mittens', age: 3, breed: 'Maine Coon', gender: 'female', avatar: cat },
  { id: 3, name: 'KitKat', age: 2, breed: 'Bengal', gender: 'male', avatar: noSmile }
];


function CatsPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [selectedCat, setSelectedCat] = useState(dummyCats[0]);
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
        
            <SideBar />
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
                <Box sx={{ flex: '1 1 100px', p: 2, bgcolor: 'background.paper', borderRadius: 1}}>
                    Cat object selection
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <img
                            src={selectedCat.avatar}
                            alt={selectedCat.name}
                            style={{ width: '60%', borderRadius: '8px' }}
                        />
                        <Typography variant="h6" mt={2}>{selectedCat.name}</Typography>
                        <Typography>Age: {selectedCat.age}</Typography>
                        <Typography>Breed: {selectedCat.breed}</Typography>
                        <Typography>Gender: {selectedCat.gender}</Typography>
                    </Box>
                    <CatSelector
                        cats={dummyCats}
                        selectedCat={selectedCat}
                        setSelectedCat={setSelectedCat}
                        />
                </Box>

                {/* Cat form */}
                <Box sx={{ flex: '1 1 300px', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>Cat form
                    <Typography>Name</Typography>
                    <TextField label="Enter Name"/>
                    <Typography>Age</Typography>
                    <TextField label="Enter age"/>
                    <Typography>Breed</Typography>
                    <TextField label="Enter Name"/>
                    <Typography>Gender</Typography>
                    <TextField label="Enter Gender"/>
                    <Button sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.common.white}}>Add Cat</Button>
                </Box>
            </Box>
        </>
    );
}

export default CatsPage;