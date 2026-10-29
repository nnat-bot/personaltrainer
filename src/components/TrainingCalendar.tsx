import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import type { EventInput } from '@fullcalendar/core';
import dayjs from 'dayjs';
import { Alert, Box } from '@mui/material';
import { getTrainings } from '../api';
import type { Training } from '../types';
import { customerName } from '../utils';

const timeFormat = { hour: '2-digit', minute: '2-digit', hour12: false } as const;

function toCalendarEvent(training: Training): EventInput {
  const start = dayjs(training.date);
  return {
    id: String(training.id),
    title: `${training.activity} / ${customerName(training)}`,
    start: start.toDate(),
    end: start.add(training.duration, 'minute').toDate(),
  };
}

export default function TrainingCalendar() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getTrainings()
      .then(setTrainings)
      .catch(err => {
        console.error(err);
        setError('Could not load trainings. Please try again later.');
      });
  }, []);

  return (
    <Box sx={{ my: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={trainings.map(toCalendarEvent)}
        firstDay={1}
        locale="en-gb"
        eventTimeFormat={timeFormat}
        slotLabelFormat={timeFormat}
        allDaySlot={false}
        scrollTime="07:00:00"
        nowIndicator
        dayMaxEvents={3}
        height={700}
      />
    </Box>
  );
}