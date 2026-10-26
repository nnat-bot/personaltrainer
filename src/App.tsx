import { AppBar, Container, CssBaseline, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router';

function App() {
  const { pathname } = useLocation();
  const currentTab = pathname.startsWith('/trainings') ? '/trainings' : '/customers';

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ flexWrap: 'wrap', columnGap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Personal Trainer
          </Typography>
          <Tabs value={currentTab} textColor="inherit" indicatorColor="secondary">
            <Tab label="Customers" value="/customers" component={Link} to="/customers" />
            <Tab label="Trainings" value="/trainings" component={Link} to="/trainings" />
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