import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import type { CustomerData } from '../types';

const emptyCustomer: CustomerData = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  streetaddress: '',
  postcode: '',
  city: '',
};

const fields: { name: keyof CustomerData; label: string; type?: string }[] = [
  { name: 'firstname', label: 'First name' },
  { name: 'lastname', label: 'Last name' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'streetaddress', label: 'Street address' },
  { name: 'postcode', label: 'Postcode' },
  { name: 'city', label: 'City' },
];

function toCustomerData(customer: CustomerData): CustomerData {
  return {
    firstname: customer.firstname,
    lastname: customer.lastname,
    email: customer.email,
    phone: customer.phone,
    streetaddress: customer.streetaddress,
    postcode: customer.postcode,
    city: customer.city,
  };
}

type CustomerDialogProps = {
  title: string;
  buttonText: string;
  initialCustomer?: CustomerData;
  onSave: (customer: CustomerData) => void;
};

export default function CustomerDialog({ title, buttonText, initialCustomer, onSave }: CustomerDialogProps) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerData>(emptyCustomer);
  const [showErrors, setShowErrors] = useState(false);

  const handleOpen = () => {
    setCustomer(initialCustomer ? toCustomerData(initialCustomer) : emptyCustomer);
    setShowErrors(false);
    setOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const hasEmptyField = Object.values(customer).some(value => value.trim() === '');
    if (hasEmptyField) {
      setShowErrors(true);
      return;
    }
    onSave(customer);
    setOpen(false);
  };

  return (
    <>
      <Button size="small" variant={initialCustomer ? 'text' : 'contained'} onClick={handleOpen}>
        {buttonText}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {fields.map(field => {
            const isEmpty = customer[field.name].trim() === '';
            return (
              <TextField
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type ?? 'text'}
                value={customer[field.name]}
                onChange={handleChange}
                error={showErrors && isEmpty}
                helperText={showErrors && isEmpty ? 'Required' : ' '}
                margin="dense"
                variant="standard"
                fullWidth
              />
            );
          })}
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