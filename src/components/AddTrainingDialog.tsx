import { useState } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import type { Customer, TrainingData } from '../types';

function nextFullHour(): Dayjs {
  return dayjs().startOf('hour').add(1, 'hour');
}

type AddTrainingDialogProps = {
  customer: Customer;
  onSave: (training: TrainingData) => void;
};

export default function AddTrainingDialog({ customer, onSave }: AddTrainingDialogProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(nextFullHour());
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  const isDateValid = date !== null && date.isValid();
  const isActivityValid = activity.trim() !== '';
  const isDurationValid = Number(duration) > 0;

  const handleOpen = () => {
    setDate(nextFullHour());
    setActivity('');
    setDuration('');
    setShowErrors(false);
    setOpen(true);
  };

  const handleSave = () => {
    if (!isDateValid || !isActivityValid || !isDurationValid) {
      setShowErrors(true);
      return;
    }
    onSave({
      date: date.toISOString(),
      activity: activity.trim(),
      duration: Number(duration),
      customer: customer._links.self.href,
    });
    setOpen(false);
  };

  return (
    <>
      <Button size="small" onClick={handleOpen}>
        Add training
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          New training for {customer.firstname} {customer.lastname}
        </DialogTitle>
        <DialogContent>
          <DateTimePicker
            label="Date and time"
            value={date}
            onChange={newDate => setDate(newDate)}
            format="DD.MM.YYYY HH:mm"
            ampm={false}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'dense',
                error: showErrors && !isDateValid,
                helperText: showErrors && !isDateValid ? 'Choose a valid date' : ' ',
              },
            }}
          />
          <TextField
            label="Activity"
            value={activity}
            onChange={e => setActivity(e.target.value)}
            error={showErrors && !isActivityValid}
            helperText={showErrors && !isActivityValid ? 'Required' : ' '}
            margin="dense"
            fullWidth
          />
          <TextField
            label="Duration (min)"
            type="number"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            error={showErrors && !isDurationValid}
            helperText={showErrors && !isDurationValid ? 'Enter a duration greater than 0' : ' '}
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}