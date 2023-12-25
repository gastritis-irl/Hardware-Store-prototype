import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Popover,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';

import ThemeSwitcher from './ThemeSwitcher';
import { useAuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';
import CustomButton from './CustomButton';

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

  useEffect(() => {}, [authState]);

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
      <AppBar position="static" color="primary">
        <Toolbar color="primary" sx={{ paddingBottom: '0 2rem' }}>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <RouterLink to="/" style={{ textDecoration: 'none' }}>
              <CustomButton color="inherit">Home</CustomButton>
            </RouterLink>
            {isLoggedIn && (
              <CustomButton color="inherit" onClick={handleMenuClick}>
                Menu
              </CustomButton>
            )}
            <Menu
              id="simple-menu"
              anchorEl={menuAnchorEl}
              keepMounted
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component={RouterLink} to="/create">
                Create
              </MenuItem>
            </Menu>
          </Box>
          {isLoggedIn ? (
            <>
              <RouterLink to="/profile">
                <AccountCircle
                  color="secondary"
                  onClick={(event) => handlePopoverOpen(event)}
                  sx={{ cursor: 'pointer' }}
                />
              </RouterLink>
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
                    <Typography variant="body2" color="text.secondary" align="center">
                      Role: {authState.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      User ID: {authState.id}
                    </Typography>
                  </CardContent>
                </Card>
              </Popover>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
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
