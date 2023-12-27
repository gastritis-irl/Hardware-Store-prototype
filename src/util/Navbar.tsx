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
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" component="div" color="primary" sx={{ textAlign: 'left' }}>
        Hardware Store
      </Typography>
      <AppBar position="static" color="inherit">
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
            <Tooltip title="Home" arrow>
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
              <MenuItem onClick={handleMenuClose} component={RouterLink} to="/list">
                Products
              </MenuItem>
              {isLoggedIn && (
                <>
                  <MenuItem onClick={handleMenuClose} component={RouterLink} to="/create">
                    Create
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
          {isLoggedIn ? (
            <>
              <AccountCircle
                color="secondary"
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
              <Button color="primary" component={RouterLink} to="/login">
                Login
              </Button>
              <RouterLink to="/register">
                <CustomButton color="inherit">Register</CustomButton>
              </RouterLink>
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
