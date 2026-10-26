import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeMaterial } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Alert, Button, Snackbar, Stack, TextField } from '@mui/material';
import { addCustomer, deleteCustomer, getCustomers, updateCustomer } from '../api';
import type { Customer, CustomerData } from '../types';
import ConfirmDialog from './ConfirmDialog';
import CustomerDialog from './CustomerDialog';

const dataColumns: ColDef<Customer>[] = [
  { field: 'firstname', headerName: 'First name' },
  { field: 'lastname', headerName: 'Last name' },
  { field: 'email', minWidth: 200 },
  { field: 'phone' },
  { field: 'streetaddress', headerName: 'Address', minWidth: 160 },
  { field: 'postcode' },
  { field: 'city' },
];

const defaultColDef: ColDef<Customer> = {
  flex: 1,
  minWidth: 120,
  sortable: true,
  filter: true,
  floatingFilter: true,
};

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  const fetchCustomers = () => {
    getCustomers()
      .then(setCustomers)
      .catch(err => {
        console.error(err);
        setError('Could not load customers. Please try again later.');
      });
  };

  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .catch(err => {
        console.error(err);
        setError('Could not load customers. Please try again later.');
      });
  }, []);

  const runAction = (action: Promise<void>, successMessage: string, errorMessage: string) => {
    action
      .then(() => {
        fetchCustomers();
        setMessage(successMessage);
      })
      .catch(err => {
        console.error(err);
        setMessage(errorMessage);
      });
  };

  const handleAdd = (customer: CustomerData) => {
    runAction(addCustomer(customer), 'Customer added', 'Could not add customer');
  };

  const handleUpdate = (url: string, customer: CustomerData) => {
    runAction(updateCustomer(url, customer), 'Customer updated', 'Could not update customer');
  };

  const handleDeleteConfirm = () => {
    if (!customerToDelete) return;
    runAction(
      deleteCustomer(customerToDelete._links.self.href),
      'Customer deleted',
      'Could not delete customer',
    );
    setCustomerToDelete(null);
  };

  const columnDefs: ColDef<Customer>[] = [
    ...dataColumns,
    {
      headerName: 'Actions',
      sortable: false,
      filter: false,
      pinned: 'right',
      minWidth: 180,
      cellRenderer: (params: ICellRendererParams<Customer>) =>
        params.data && (
          <Stack direction="row" spacing={1} sx={{ height: '100%', alignItems: 'center' }}>
            <CustomerDialog
              title="Edit customer"
              buttonText="Edit"
              initialCustomer={params.data}
              onSave={customer => handleUpdate(params.data!._links.self.href, customer)}
            />
            <Button size="small" color="error" onClick={() => setCustomerToDelete(params.data!)}>
              Delete
            </Button>
          </Stack>
        ),
    },
  ];

  return (
    <Stack spacing={2} sx={{ my: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: { sm: 'center' } }}>
        <CustomerDialog title="New customer" buttonText="Add customer" onSave={handleAdd} />
        <TextField
          size="small"
          label="Search customers"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ maxWidth: 320 }}
        />
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}

      <div style={{ height: 600, width: '100%' }}>
        <AgGridReact<Customer>
          rowData={customers}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50]}
          quickFilterText={search}
          theme={themeMaterial}
        />
      </div>

      <ConfirmDialog
        open={customerToDelete !== null}
        title="Delete customer?"
        message={
          customerToDelete
            ? `Delete ${customerToDelete.firstname} ${customerToDelete.lastname}? All of this customer's trainings will also be deleted. This cannot be undone.`
            : ''
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setCustomerToDelete(null)}
      />

      <Snackbar
        open={message !== ''}
        autoHideDuration={3000}
        onClose={() => setMessage('')}
        message={message}
      />
    </Stack>
  );
}