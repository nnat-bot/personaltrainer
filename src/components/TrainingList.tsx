import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeMaterial } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Alert, Button, Snackbar, Stack, TextField } from '@mui/material';
import { deleteTraining, getTrainings } from '../api';
import type { Training } from '../types';
import { customerName, formatDateTime } from '../utils';
import ConfirmDialog from './ConfirmDialog';

const dataColumns: ColDef<Training>[] = [
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
    valueGetter: params => (params.data ? customerName(params.data) : ''),
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
  const [message, setMessage] = useState('');
  const [trainingToDelete, setTrainingToDelete] = useState<Training | null>(null);

  const fetchTrainings = () => {
    getTrainings()
      .then(setTrainings)
      .catch(err => {
        console.error(err);
        setError('Could not load trainings. Please try again later.');
      });
  };

  useEffect(() => {
    getTrainings()
      .then(setTrainings)
      .catch(err => {
        console.error(err);
        setError('Could not load trainings. Please try again later.');
      });
  }, []);

  const handleDeleteConfirm = () => {
    if (!trainingToDelete) return;
    deleteTraining(trainingToDelete.id)
      .then(() => {
        fetchTrainings();
        setMessage('Training deleted');
      })
      .catch(err => {
        console.error(err);
        setMessage('Could not delete training');
      });
    setTrainingToDelete(null);
  };

  const columnDefs: ColDef<Training>[] = [
    ...dataColumns,
    {
      headerName: 'Actions',
      sortable: false,
      filter: false,
      pinned: 'right',
      minWidth: 120,
      cellRenderer: (params: ICellRendererParams<Training>) =>
        params.data && (
          <Button size="small" color="error" onClick={() => setTrainingToDelete(params.data!)}>
            Delete
          </Button>
        ),
    },
  ];

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

      <ConfirmDialog
        open={trainingToDelete !== null}
        title="Delete training?"
        message={
          trainingToDelete
            ? `Delete ${trainingToDelete.activity} on ${formatDateTime(trainingToDelete.date)} (${customerName(trainingToDelete)})? This cannot be undone.`
            : ''
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setTrainingToDelete(null)}
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