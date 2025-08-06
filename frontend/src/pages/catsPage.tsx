import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar';
import SideBar from '../components/sidebar';
import { useNavigate } from 'react-router-dom';
import CatSelector from '../components/catSelector';

import { Button, TextField, Typography, useTheme } from '@mui/material';

function CatsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [catForm, setCatForm] = useState({ name: '', age: '', breed: '', gender: '' });
  const [cats, setCats] = useState<any[]>([]);
  const [selectedCat, setSelectedCat] = useState<any>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const token = localStorage.getItem("token");

  const fetchCats = async () => {
    if (!token) return;
    try {
        const response = await fetch('http://localhost:3001/api/cats/getCat', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });
    
      const data = await response.json();
      if (response.ok) {
        setCats(data.cats);
        setSelectedCat(data.cats.length > 0 ? data.cats[0] : null);
      } else {
        console.error("Failed to fetch cats", data.error);
      }
    } catch (err) {
      console.error("Error fetching cats", err);
    }
  };

  useEffect(() => {
    const name = localStorage.getItem("firstName");
    if (token) setIsLoggedIn(true);
    if (name) setFirstName(name);

    fetchCats();
  }, []);

  const handleCatFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCatForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCatDeletion = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/cats/addCat', {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if(response.ok) {
        setCats(data.cats);
        setStatusMessage('Cat deleted!');
      
      } else {
        console.error("Failed to delete cats", data.error);
      }
    } catch(error) {
      console.error('Error deleting cat:', error);
      setStatusMessage('Error deleting cat');
    }
  }

  const handleCatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('');

    if (!catForm.name || !catForm.age || !catForm.breed || !catForm.gender) {
      setStatusMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/cats/addCat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(catForm),
      });

      if (response.ok) {
        setStatusMessage('Cat added!');
        setCatForm({ name: '', age: '', breed: '', gender: '' }); 
        await fetchCats();
      } else {
        setStatusMessage('Cat addition failed');
      }
    } catch (error) {
      console.error('Error adding cat:', error);
      setStatusMessage('Error adding cat');
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    setIsLoggedIn(false);
    setFirstName('');
    navigate('/');
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} firstName={firstName} onLogout={logout} />
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
        {/* Cat profile and selector */}
        <Box sx={{ flex: '1 1 100px', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>Cat object selection</Typography>

          {cats.length === 0 ? (
            <Typography mt={2} textAlign="center" color="text.secondary">
              No cats found. Please add one using the form.
            </Typography>
          ) : (
            <>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <img
                  src={selectedCat?.avatar ?? ''}
                  alt={selectedCat?.name ?? 'No Cat'}
                  style={{ width: '60%', borderRadius: '8px' }}
                />
                <Typography variant="h6" mt={2}>{selectedCat?.name}</Typography>
                <Typography>Age: {selectedCat?.age}</Typography>
                <Typography>Breed: {selectedCat?.breed}</Typography>
                <Typography>Gender: {selectedCat?.gender}</Typography>
              </Box>
              <CatSelector cats={cats} selectedCat={selectedCat} setSelectedCat={setSelectedCat} />
              <Button onClick={handleCatDeletion}>Remove Cat</Button>
            </>
          )}
        </Box>

        {/* Cat form */}
        <Box sx={{ flex: '1 1 300px', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>Cat form</Typography>
          <TextField label="Enter Name" name="name" value={catForm.name} onChange={handleCatFormChange} fullWidth margin="dense" />
          <TextField label="Enter Age" name="age" value={catForm.age} onChange={handleCatFormChange} fullWidth margin="dense" />
          <TextField label="Enter Breed" name="breed" value={catForm.breed} onChange={handleCatFormChange} fullWidth margin="dense" />
          <TextField label="Enter Gender" name="gender" value={catForm.gender} onChange={handleCatFormChange} fullWidth margin="dense" />
          <Button
            onClick={handleCatSubmit}
            sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.common.white, mt: 2 }}
            fullWidth
          >
            Add Cat
          </Button>

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
