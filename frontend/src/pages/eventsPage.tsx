import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Components
import NavBar from '../components/navbar';
import SideBar from '../components/sidebar';
import EventModal from '../components/eventModal';
import CatEvents from '../components/events';
import SearchBar from '../components/searchBar';
import CatSelector from "../components/catSelector";

// Types
import { Cat } from '../types/cat';
import { CatEvent } from '../types/catEvent';

function EventsPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [cats, setCats] = useState<Cat[]>([]);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [events, setEvents] = useState<CatEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Search bar
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch cats from backend
  const fetchCats = async () => {
    if (!token) return;
    try {
      const response = await fetch('http://localhost:3001/api/cats/getCat', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
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

  const fetchEvents = async () => {
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3001/api/events/getEvent', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();

      if(response.ok) {
         setEvents(data.catEvents ?? []);
      } else {
         setEvents(data.catEvents);
      }
    } catch(error) {
       console.error('Error fetching Events:', error);
    }
  }

  const deleteEvents = async (eventId: string) => {
    if (!token) return;
    
    try {
      const response = await fetch('http://localhost:3001/api/events/deleteEvent', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventId })
      });

      const data = await response.json();

      if(response.ok) {
         setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
      } else {
         console.error('Failed to delete event:', data.error);
      }
    } catch(error) {
       console.error('Error fetching Events:', error);
    }
  }


  useEffect(() => {
    const name = localStorage.getItem('firstName');
    if (token) setIsLoggedIn(true);
    if (name) setFirstName(name);

    fetchCats();
    fetchEvents();
  }, []);

  // show events on cat selection
  const filteredEvents = events
    .filter(e => selectedCat ? String(e.cat_id) === String(selectedCat.id) : true)
    .filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()));

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
          <CatSelector cats={cats} selectedCat={selectedCat} setSelectedCat={setSelectedCat} />
          <EventModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            cats={cats}
            selectedCat={selectedCat}
            setSelectedCat={setSelectedCat}
          />

          <Box sx={{ width: '300px' }}>
            <SearchBar onSearch={setSearchTerm} />
          </Box>
        </Box>

        {/* Upcoming Events */}
        <Box sx={{ flex: '1 1 300px', p: 2, bgcolor: 'background.paper', borderRadius: 1, width: '50%' }}>
          <h3>Upcoming Events</h3>
          <CatEvents events={filteredEvents} onDelete={deleteEvents}/>
        </Box>
      </Box>
    </>
  );
}

export default EventsPage;
