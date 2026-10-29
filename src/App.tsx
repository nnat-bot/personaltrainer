import { AppBar, Container, CssBaseline, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router';

const pages = [
  { label: 'Customers', path: '/customers' },
  { label: 'Trainings', path: '/trainings' },
  { label: 'Calendar', path: '/calendar' },
];

function App() {
  const { pathname } = useLocation();
  const currentTab = pages.find(page => pathname.startsWith(page.path))?.path ?? '/customers';

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ flexWrap: 'wrap', columnGap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Personal Trainer
          </Typography>
          <Tabs value={currentTab} textColor="inherit" indicatorColor="secondary">
            {pages.map(page => (
              <Tab key={page.path} label={page.label} value={page.path} component={Link} to={page.path} />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
}

export default App;