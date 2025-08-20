import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Components
import NavBar from '../components/navbar';
import SideBar from '../components/sidebar';
import CatSelector from '../components/catSelector';
import EventModal from '../components/eventModal';
import CatEvents from '../components/events';
import SearchBar from '../components/searchBar';

// Types
import { Cat } from '../components/eventModal';

interface Event {
  id: number;
  catId: number;
  title: string;
  date: string;
  type: string;
  notes?: string;
}

function EventsPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [cats, setCats] = useState<Cat[]>([]);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch cats from backend
  const fetchCats = async () => {
    if (!token) return;
    try {
      const response = await fetch('http://localhost:3001/api/cats/getCat', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCats(data.cats);
        setSelectedCat(data.cats[0] ?? null);
      } else {
        console.error('Failed to fetch cats:', data.error);
      }
    } catch (error) {
      console.error('Error fetching cats:', error);
    }
  };

  useEffect(() => {
    const name = localStorage.getItem('firstName');
    if (token) setIsLoggedIn(true);
    if (name) setFirstName(name);

    fetchCats();
  }, []);

  // Add a new event
  const handleAddEvent = (catId: number, title: string, date: string, type: string, note?: string) => {
    if (!catId) return;

    // post thing
  };

  // create categories for filtered cats or all events
  // Filter events for currently selected cat
  const filteredEvents = selectedCat ? events.filter(e => e.catId === selectedCat.id) : [];

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
      <SideBar />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3, mt: 5, maxWidth: '1200px', mx: 'auto' }}>
        {/* Top controls: Add Event, Cat Selector, Search */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Button variant="contained" onClick={() => setIsModalOpen(true)}>Add Event</Button>
          
          <EventModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            cats={cats}
            selectedCat={selectedCat}
            setSelectedCat={setSelectedCat}
            onAddEvent={handleAddEvent}
          />

          <Box sx={{ width: '300px' }}>
            <SearchBar onSearch={() => {}} />
          </Box>
        </Box>

        {/* Upcoming Events */}
        <Box sx={{ flex: '1 1 300px', p: 2, bgcolor: 'background.paper', borderRadius: 1, width: '50%' }}>
          <h3>Upcoming Events</h3>
          <CatEvents events={filteredEvents} />
        </Box>
      </Box>
    </>
  );
}

export default EventsPage;
