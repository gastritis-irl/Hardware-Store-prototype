import React, { useState } from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';
import CustomButton from './CustomButton';
import ThemeSwitcher from './ThemeSwitcher';
import { useFilterSort } from '../hooks/useFilterSort';
import FilterSortPopover from './FilterSortPopover';
import UserMenu from './UserMenu';
import NavigationMenu from './NavigationMenu';

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

  const { orderBy, direction, handleOrderChange, handleDirectionChange, handleFilter } = useFilterSort();

  const [filterPopoverAnchorEl, setFilterPopoverAnchorEl] = useState<null | HTMLElement>(null);
  const handleFilterPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterPopoverAnchorEl(event.currentTarget);
  };
  const handleFilterPopoverClose = () => {
    setFilterPopoverAnchorEl(null);
  };
  const filterOpen = Boolean(filterPopoverAnchorEl);
  const isProfilePage = window.location.pathname === '/profile';

  const navigate = useNavigate();

  const handleLogout = () => {
    mutate();
    navigate('/');
  };

  return (
    <>
      <Typography variant="h4" align="left" color="primary">
        Hardware Store
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          position: 'sticky',
          top: '0.2rem',
          zIndex: 1,
        }}
      >
        <AppBar
          color="inherit"
          sx={{
            borderRadius: 1,
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
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
                      color: 'secondary.main',
                      transform: 'scale(1.2)',
                      transition: 'transform 0.3s ease-in-out', // Smooth transition
                    },
                  }}
                >
                  <HomeIcon />
                </IconButton>
              </Tooltip>
              <NavigationMenu />
            </Box>
            <Box>
              {isLoggedIn && isProfilePage && (
                <FilterSortPopover
                  open={filterOpen}
                  anchorEl={filterPopoverAnchorEl}
                  handlePopoverOpen={handleFilterPopoverOpen}
                  handlePopoverClose={handleFilterPopoverClose}
                  orderBy={orderBy}
                  direction={direction}
                  handleOrderChange={handleOrderChange}
                  handleDirectionChange={handleDirectionChange}
                  handleFilter={handleFilter}
                />
              )}
            </Box>
            {isLoggedIn ? (
              <UserMenu handleLogout={handleLogout} />
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
    </>
  );
}
