import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';

import { useAuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';
import CustomButton from './CustomButton';
import ThemeSwitcher from './ThemeSwitcher';

type NavbarProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const { authState } = useAuthContext();
  const isLoggedIn = new Date(authState.expirationDate) > new Date() && Boolean(authState.token);
  const {
    logoutMutation: { mutate },
  } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    mutate();
    navigate('/');
  };

  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
  const handlePopoverOpen = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        // position: 'sticky',
        // top: 0,
      }}
    >
      <Typography variant="h6" component="div" color="primary" sx={{ textAlign: 'left' }}>
        Hardware Store
      </Typography>
      <AppBar position="sticky" color="inherit" sx={{ borderRadius: 1 }}>
        <Toolbar sx={{ paddingBottom: '0 2rem' }}>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Tooltip color="primary" title="Home" arrow sx={{ color: 'primary' }}>
              <IconButton
                component={RouterLink}
                to="/"
                color="primary"
                sx={{
                  '&:hover': {
                    color: 'secondary.main', // Change color on hover
                    transform: 'scale(1.2)', // Scale the icon on hover
                    transition: 'transform 0.3s ease-in-out', // Smooth transition
                  },
                }}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>

            <Button color="primary" onClick={handleMenuClick}>
              Menu
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={menuAnchorEl}
              keepMounted
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={handleMenuClose}
                component={RouterLink}
                to="/list"
                sx={{
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    transition: 'background-color 0.3s ease-in-out',
                  },
                }}
              >
                Products
              </MenuItem>
              {isLoggedIn && (
                <MenuItem
                  onClick={handleMenuClose}
                  component={RouterLink}
                  to="/add"
                  sx={{
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      transition: 'background-color 0.3s ease-in-out',
                    },
                  }}
                >
                  Add New
                </MenuItem>
              )}
            </Menu>
          </Box>
          {isLoggedIn ? (
            <>
              <AccountCircle
                color="primary"
                onClick={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) => handlePopoverOpen(event)}
                sx={{ cursor: 'pointer' }}
              />
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Card sx={{ maxWidth: 345, margin: 'auto' }}>
                  <Avatar
                    alt="User profile picture"
                    src="/alt3.png"
                    sx={{ width: 128, height: 128, margin: 'auto', marginTop: '1rem' }}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div" align="center" color="text.secondary">
                      {authState.email}
                    </Typography>
                    <RouterLink to="/profile">
                      <Button color="primary" fullWidth>
                        Visit Profile
                      </Button>
                    </RouterLink>
                  </CardContent>
                </Card>
              </Popover>
              <Button color="primary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <RouterLink to="/register">
                <CustomButton color="inherit">Register</CustomButton>
              </RouterLink>
              <Button color="primary" component={RouterLink} to="/login">
                Login
              </Button>
            </>
          )}
          <Box sx={{ ml: 2 }}>
            <ThemeSwitcher darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
