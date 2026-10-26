import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeMaterial } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { Alert, Stack, TextField } from '@mui/material';
import { getCustomers } from '../api';
import type { Customer } from '../types';

const columnDefs: ColDef<Customer>[] = [
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

  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .catch(err => {
        console.error(err);
        setError('Could not load customers. Please try again later.');
      });
  }, []);

  return (
    <Stack spacing={2} sx={{ my: 2 }}>
      <TextField
        size="small"
        label="Search customers"
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ maxWidth: 320 }}
      />

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
    </Stack>
  );
}