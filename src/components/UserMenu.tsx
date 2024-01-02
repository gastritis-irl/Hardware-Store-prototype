import React, { useState } from 'react';
import { Avatar, Button, Card, CardContent, Popover, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

type UserMenuProps = {
  handleLogout: () => void;
};

function UserMenu({ handleLogout }: UserMenuProps) {
  const { authState } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handlePopoverOpen = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <AccountCircle color="primary" onClick={(event) => handlePopoverOpen(event)} sx={{ cursor: 'pointer' }} />
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
        disableScrollLock
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
              <Button color="primary" fullWidth onClick={handlePopoverClose}>
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
  );
}

export default UserMenu;
