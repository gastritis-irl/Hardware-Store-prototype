import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import ThemeSwitcher from './ThemeSwitcher';
import { useLogout } from '../hooks/useAuth';

type NavbarProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const isLoggedIn = false;
  return (
    <AppBar position="static" sx={{ flexGrow: 1 }}>
      <Toolbar sx={{ paddingBottom: '0 2rem' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hardware Store
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/create">
          Create
        </Button>
        {!isLoggedIn ? (
          <>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Register
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
        <Box sx={{ ml: 2 }}>
          <ThemeSwitcher darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
