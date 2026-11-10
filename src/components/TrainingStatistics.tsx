import { useEffect, useState } from 'react';
import { Alert, Box, Typography } from '@mui/material';
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getTrainings } from '../api';
import type { Training } from '../types';
import { minutesByActivity } from '../utils';

export default function TrainingStatistics() {
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

  const data = minutesByActivity(trainings);

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Minutes by activity
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 24, right: 16, left: 16, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={value => [`${value} min`, 'Duration']} />
          <Bar dataKey="minutes" fill="#1976d2">
            <LabelList dataKey="minutes" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}