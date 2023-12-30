import React from 'react';
import { Avatar, Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAuthContext } from '../context/AuthContext';
import HardwarePartsGrid from '../util/HardwarePartsGrid';

function ProfilePage() {
  const { authState } = useAuthContext();

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
    <Grid sx={{ marginTop: '1rem' }}>
      {' '}
      <Grid item xs={12} md={6} flex={1} container spacing={0}>
        <Card>
          <Avatar
            alt="User profile picture"
            src="/alt3.png"
            sx={{ width: 128, height: 128, margin: 'auto', marginTop: '1rem' }}
          />
          <CardContent>
            <Typography variant="h3">{authState.email}</Typography>
            <Typography variant="body1" color="text.secondary">
              Role: {authState.role}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <HardwarePartsGrid userId={authState.id} />
    </Grid>
  );
}

export default ProfilePage;
