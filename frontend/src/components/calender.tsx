import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { CatEvent } from '../types/catEvent';
import { CalendarProps } from 'react-calendar';

interface CatCalendarProps {
  events: CatEvent[];
}

function CatCalendar({ events }: CatCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const formattedSelectedDate = selectedDate.format('YYYY-MM-DD');

  // filter events for selected date
  const eventsOnSelectedDate = events.filter(
    (event) => event.date === formattedSelectedDate
  );

  // show event on selected date
  const onChange = (newValue: Dayjs | null) => {
    if (newValue) setSelectedDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
        <DateCalendar onChange={onChange} value={selectedDate} />
        
        <Box mt={3}>
          {eventsOnSelectedDate.length === 0 ? (
            <Typography>No events for this day.</Typography>
          ) : (
            eventsOnSelectedDate.map((event) => (
              <Box
                key={event.id}
                sx={{
                  mb: 2,
                  p: 2,
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  backgroundColor: '#f9f9f9'
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {event.type}
                </Typography>
                {event.notes && (
                  <Typography variant="body2" color="text.secondary">
                    Notes: {event.notes}
                  </Typography>
                )}
              </Box>
            ))
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default CatCalendar;
