import React from 'react';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { Box, Divider } from '@mui/material';

dayjs.extend(isSameOrAfter);

type CatEvent = {
  id: number;
  catId: number;
  title: string;
  date: string;
  type: string;
  notes?: string;
};

type EventsProp = {
  events: CatEvent[];
};

function CatEvents({ events }: EventsProp) {
  const today = dayjs().startOf('day');
    
  const showAllEvents = true; 

  const upcomingEvents = showAllEvents
    ? events
    : events.filter(event => dayjs(event.date).isSameOrAfter(today))
            .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

    //show past, bacially edit that coming events const and have a button to switch between present and past
  // add edit notes
  
  return (
    <Box>
      {upcomingEvents.map(event => (
        <Box key={event.id}
          sx={{
                mb: 2,
                p: 2,
                border: '1px solid #ccc',
                width: '250px',
                height: '150px',
                borderRadius: 2,
                backgroundColor: '#f9f9f9'
                }}>
          {event.title} — {event.date} 
          <Divider/>
          {event.type}
          <br/>
          {event.notes}
        </Box>
      ))}
    </Box>
  );
}

export default CatEvents;
