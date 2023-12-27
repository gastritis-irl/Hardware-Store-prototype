import React from 'react';
import { Avatar, Box, Container, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAuthContext } from '../context/AuthContext';
import { useHardwarePartsByUser } from '../hooks/useUsers';
import HardwarePartsGrid from '../util/HardwarePartsGrid';

function ProfilePage() {
  const { authState } = useAuthContext();
  const { data: userHardwareParts } = useHardwarePartsByUser(authState.id);

  if (authState.id === -1) {
    return (
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <LockOpenIcon color="primary" style={{ fontSize: 60 }} />
          <Typography variant="h4" component="div" align="center" color="primary">
            Please login to view your profile
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <Avatar
          alt="User profile picture"
          src="/alt3.png"
          sx={{ width: 128, height: 128, margin: 'auto', marginTop: '1rem' }}
        />
        <Typography variant="h4" component="div" align="center" color="secondary">
          {authState.email}
        </Typography>
      </Box>
      <HardwarePartsGrid hardwareParts={userHardwareParts || []} />
    </Container>
  );
}

export default ProfilePage;
