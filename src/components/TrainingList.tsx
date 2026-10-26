import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeMaterial } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { Alert, Stack, TextField } from '@mui/material';
import { getTrainings } from '../api';
import type { Training } from '../types';
import { formatDateTime } from '../utils';

const columnDefs: ColDef<Training>[] = [
  {
    field: 'date',
    headerName: 'Date',
    sort: 'desc',
    valueFormatter: params => formatDateTime(params.value),
    filterValueGetter: params => (params.data ? formatDateTime(params.data.date) : ''),
    getQuickFilterText: params => formatDateTime(params.value),
  },
  {
    field: 'duration',
    headerName: 'Duration (min)',
    filter: 'agNumberColumnFilter',
  },
  { field: 'activity' },
  {
    colId: 'customer',
    headerName: 'Customer',
    valueGetter: params =>
      params.data?.customer
        ? `${params.data.customer.firstname} ${params.data.customer.lastname}`
        : '',
  },
];

const defaultColDef: ColDef<Training> = {
  flex: 1,
  minWidth: 140,
  sortable: true,
  filter: true,
  floatingFilter: true,
};

export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [search, setSearch] = useState('');
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
    <Stack spacing={2} sx={{ my: 2 }}>
      <TextField
        size="small"
        label="Search trainings"
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ maxWidth: 320 }}
      />

      {error && <Alert severity="error">{error}</Alert>}

      <div style={{ height: 600, width: '100%' }}>
        <AgGridReact<Training>
          rowData={trainings}
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