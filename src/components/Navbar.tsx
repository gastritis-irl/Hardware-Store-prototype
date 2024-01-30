import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, IconButton, Theme, Toolbar, Tooltip, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/user/useAuth';
import CustomButton from '../util/CustomButton';
import { useFilterSort } from '../hooks/useFilterSort';
import FilterSortPopover from './FilterSortPopover';
import UserMenu from './UserMenu';
import NavigationMenu from './NavigationMenu';
import ThemeSelector from './ThemeSelector';
import { customTheme, darkTheme, lightTheme } from '../util/Theme';

type NavbarProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export function Navbar({ theme, setTheme }: NavbarProps) {
  const { authState } = useAuthContext();
  const isLoggedIn = new Date(authState.expirationDate) > new Date() && Boolean(authState.token);
  const {
    logoutMutation: { mutate },
  } = useAuth();

  useEffect(() => {
    switch (authState.themeId) {
      case 1:
        setTheme(lightTheme);
        break;
      case 2:
        setTheme(darkTheme);
        break;
      case 3:
        setTheme(customTheme);
        break;
      default:
        setTheme(lightTheme);
    }
  }, [authState]);

  const { orderBy, direction, handleOrderChange, handleDirectionChange, handleFilter } = useFilterSort();

  const [filterPopoverAnchorEl, setFilterPopoverAnchorEl] = useState<null | HTMLElement>(null);
  const handleFilterPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterPopoverAnchorEl(event.currentTarget);
  };
  const handleFilterPopoverClose = () => {
    setFilterPopoverAnchorEl(null);
  };
  const filterOpen = Boolean(filterPopoverAnchorEl);
  const isProfilePage = window.location.pathname.startsWith('/profile');

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
          position: 'sticky',
          top: '0.2rem',
          zIndex: 10,
        }}
      >
        <AppBar
          color="inherit"
          sx={{
            borderRadius: 1,
            position: 'sticky',
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
                      transition: 'transform 0.3s ease-in-out',
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
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <ThemeSelector theme={theme} setTheme={setTheme} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
