import React from 'react';
import dayjs from 'dayjs';
import { Box } from '@mui/material';

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

  const upcomingEvents = events
    .filter(event => dayjs(event.date).isAfter(today))
    .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

  return (
    <Box>
      {upcomingEvents.map(event => (
        <Box key={event.id}
          sx={{
                mb: 2,
                p: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
                backgroundColor: '#f9f9f9'
                }}>
          {event.title} — {event.date}
        </Box>
      ))}
    </Box>
  );
}

export default CatEvents;
