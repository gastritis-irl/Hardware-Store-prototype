import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

function NavigationMenu() {
  const { authState } = useAuthContext();
  const isLoggedIn = new Date(authState.expirationDate) > new Date() && Boolean(authState.token);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button color="primary" onClick={handleMenuClick}>
        Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        disableScrollLock
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
    </>
  );
}

export default NavigationMenu;
