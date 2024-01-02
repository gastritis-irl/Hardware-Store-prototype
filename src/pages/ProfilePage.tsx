import React from 'react';
import { Avatar, Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAuthContext } from '../context/AuthContext';
import HardwarePartsGrid from '../components/HardwarePartsGrid';
import { useFilterSort } from '../hooks/useFilterSort';

function ProfilePage() {
  const { authState } = useAuthContext();

  const { orderBy, direction, minPrice, maxPrice, textSearch } = useFilterSort();

  if (authState.id === -1) {
    return (
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh',
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
    <Grid container spacing={0} lg md sm xs sx={{ marginTop: '1rem', flexDirection: 'row' }}>
      <Grid
        container
        justifyContent="space-between"
        sx={{
          marginTop: '1rem',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          '@media (max-width: 600px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Grid item xs={12} md={4} flex={1} spacing={0}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              maxWidth: 250,
              minHeight: 300,
            }}
          >
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
        <HardwarePartsGrid
          userId={authState.id}
          minPrice={minPrice}
          maxPrice={maxPrice}
          direction={direction}
          orderBy={orderBy}
          textSearch={textSearch}
        />
      </Grid>
    </Grid>
  );
}

export default ProfilePage;
