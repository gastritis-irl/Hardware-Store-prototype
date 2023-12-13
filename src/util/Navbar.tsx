import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';

type NavbarProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hardware Store
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/create">
          Create
        </Button>
        <Button color="inherit" component={RouterLink} to="/login">
          Login
        </Button>
        <Button color="inherit" component={RouterLink} to="/register">
          Register
        </Button>
        <Box sx={{ ml: 2 }}>
          <ThemeSwitcher darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
