import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './index.css';
import App from './App.tsx';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';

ModuleRegistry.registerModules([AllCommunityModule]);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/customers" replace /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'trainings', element: <TrainingList /> },
      { path: '*', element: <Navigate to="/customers" replace /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  </StrictMode>,
);