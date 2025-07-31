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
    const [catForm, setCatForm] = useState({ name: '', age: '', breed: '', gender: '' });
    const [selectedCat, setSelectedCat] = useState(dummyCats[0]);
    const [statusMessage, setStatusMessage] = useState('');
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

    // handle setCatForm change
    const handleCatFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCatForm(prev => ({ ...prev, [name]: value }));
    };

    const handleCatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessage(''); 

        if(!catForm.name || !catForm.age || !catForm.breed || !catForm.gender) {
            return;
        }

        try{
            const response = await fetch('http://localhost:3001/api/cats/addCat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(catForm),
            });

            if(response.ok) {
                setStatusMessage('Cat added!');
            } else {
                setStatusMessage('Cat addition failed');
            }

        } catch (error) {
            console.error('Error adding cat:', error);
        }
    }

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
                    <TextField label="Enter Name" name="name" value={catForm.name} onChange={handleCatFormChange}/>
                    <Typography>Age</Typography>
                    <TextField label="Enter age" name="age" value={catForm.age} onChange={handleCatFormChange}/>
                    <Typography>Breed</Typography>
                    <TextField label="Enter Breed" name="breed" value={catForm.breed} onChange={handleCatFormChange}/>
                    <Typography>Gender</Typography>
                    <TextField label="Enter Gender" name="gender" value={catForm.gender} onChange={handleCatFormChange}/>
                    <Button onClick={handleCatSubmit} sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.common.white}}>Add Cat</Button>

                    {statusMessage && (
                    <Typography mt={2} color={statusMessage === 'Cat added!' ? 'success.main' : 'error.main'}>
                        {statusMessage}
                    </Typography>
                    )}
                </Box>
            </Box>
        </>
    );
}

export default CatsPage;